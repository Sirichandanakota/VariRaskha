"""Train and evaluate the local ResNet18 rice-leaf binary validator."""

from __future__ import annotations

import argparse
import copy
import json
import random
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import timm
import torch
from PIL import Image
from torch import nn
from torch.optim import AdamW
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

CLASS_NAMES = ["not_rice_leaf", "rice_leaf"]
IMAGE_SIZE = 224
MEAN = [0.485, 0.456, 0.406]
STD = [0.229, 0.224, 0.225]


def seed_everything(seed: int) -> None:
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    if torch.cuda.is_available():
        torch.cuda.manual_seed_all(seed)


def loaders(root: Path, batch_size: int, workers: int) -> tuple[dict[str, DataLoader], dict[str, datasets.ImageFolder]]:
    train_transform = transforms.Compose([
        transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(12),
        transforms.ColorJitter(brightness=0.15, contrast=0.15, saturation=0.15),
        transforms.ToTensor(),
        transforms.Normalize(MEAN, STD),
    ])
    eval_transform = transforms.Compose([
        transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize(MEAN, STD),
    ])
    folders = {
        split: datasets.ImageFolder(root / split, transform=train_transform if split == "train" else eval_transform)
        for split in ("train", "val", "test")
    }
    for split, dataset in folders.items():
        if dataset.classes != CLASS_NAMES:
            raise ValueError(f"{split} classes are {dataset.classes}; expected {CLASS_NAMES}")
        if not dataset.samples:
            raise ValueError(f"{split} contains no images")
    return (
        {
            split: DataLoader(
                dataset,
                batch_size=batch_size,
                shuffle=split == "train",
                num_workers=workers,
                pin_memory=torch.cuda.is_available(),
            )
            for split, dataset in folders.items()
        },
        folders,
    )


def metrics(targets: list[int], predictions: list[int]) -> dict[str, float | int]:
    target = np.asarray(targets)
    prediction = np.asarray(predictions)
    tn = int(((target == 0) & (prediction == 0)).sum())
    fp = int(((target == 0) & (prediction == 1)).sum())
    fn = int(((target == 1) & (prediction == 0)).sum())
    tp = int(((target == 1) & (prediction == 1)).sum())
    precision = tp / max(tp + fp, 1)
    recall = tp / max(tp + fn, 1)
    f1 = 2 * precision * recall / max(precision + recall, 1e-12)
    return {
        "accuracy": float((target == prediction).mean()),
        "precision": precision,
        "recall": recall,
        "f1": f1,
        "false_accept_rate": fp / max(fp + tn, 1),
        "tn": tn,
        "fp": fp,
        "fn": fn,
        "tp": tp,
    }


def run_epoch(model: nn.Module, loader: DataLoader, criterion: nn.Module, device: torch.device, optimizer: AdamW | None) -> tuple[float, dict[str, float | int]]:
    model.train(optimizer is not None)
    losses: list[float] = []
    targets: list[int] = []
    predictions: list[int] = []
    for images, labels in loader:
        images, labels = images.to(device), labels.to(device)
        with torch.set_grad_enabled(optimizer is not None):
            output = model(images)
            loss = criterion(output, labels)
            if optimizer is not None:
                optimizer.zero_grad(set_to_none=True)
                loss.backward()
                optimizer.step()
        losses.append(float(loss.item()))
        targets.extend(labels.cpu().tolist())
        predictions.extend(output.argmax(dim=1).cpu().tolist())
    return float(np.mean(losses)), metrics(targets, predictions)


def plot_history(history: dict[str, list[float]], output: Path) -> None:
    figure, axes = plt.subplots(1, 2, figsize=(10, 4))
    axes[0].plot(history["train_loss"], label="train")
    axes[0].plot(history["val_loss"], label="val")
    axes[0].set_title("Loss")
    axes[0].legend()
    axes[1].plot(history["train_f1"], label="train F1")
    axes[1].plot(history["val_f1"], label="val F1")
    axes[1].set_title("F1")
    axes[1].legend()
    figure.tight_layout()
    figure.savefig(output, dpi=140)
    plt.close(figure)


def plot_confusion(values: dict[str, float | int], output: Path) -> None:
    matrix = np.array([[values["tn"], values["fp"]], [values["fn"], values["tp"]]])
    figure, axis = plt.subplots(figsize=(4, 4))
    axis.imshow(matrix, cmap="Blues")
    axis.set_xticks([0, 1], CLASS_NAMES)
    axis.set_yticks([0, 1], CLASS_NAMES)
    axis.set_xlabel("Predicted")
    axis.set_ylabel("Actual")
    for row in range(2):
        for column in range(2):
            axis.text(column, row, matrix[row, column], ha="center", va="center")
    figure.tight_layout()
    figure.savefig(output, dpi=140)
    plt.close(figure)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", type=Path, default=Path("validator_dataset"))
    parser.add_argument("--output", type=Path, default=Path("backend/checkpoints/best_rice_leaf_validator.pth"))
    parser.add_argument("--epochs", type=int, default=30)
    parser.add_argument("--patience", type=int, default=6)
    parser.add_argument("--batch-size", type=int, default=32)
    parser.add_argument("--workers", type=int, default=0)
    parser.add_argument("--seed", type=int, default=42)
    parser.add_argument("--no-pretrained", action="store_true")
    args = parser.parse_args()

    seed_everything(args.seed)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    loaders_by_split, _ = loaders(args.data, args.batch_size, args.workers)
    try:
        model = timm.create_model("resnet18", pretrained=not args.no_pretrained, num_classes=2)
    except RuntimeError as error:
        raise SystemExit(
            "ImageNet weights are unavailable offline. Re-run with --no-pretrained "
            "or install the weights before training."
        ) from error
    model.to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = AdamW(model.parameters(), lr=3e-4, weight_decay=1e-4)
    best_state = None
    best_score = float("-inf")
    stale_epochs = 0
    history = {"train_loss": [], "val_loss": [], "train_f1": [], "val_f1": []}

    for epoch in range(args.epochs):
        train_loss, train_metrics = run_epoch(model, loaders_by_split["train"], criterion, device, optimizer)
        val_loss, val_metrics = run_epoch(model, loaders_by_split["val"], criterion, device, None)
        history["train_loss"].append(train_loss)
        history["val_loss"].append(val_loss)
        history["train_f1"].append(float(train_metrics["f1"]))
        history["val_f1"].append(float(val_metrics["f1"]))
        score = float(val_metrics["f1"]) - float(val_metrics["false_accept_rate"])
        print(f"epoch={epoch + 1} val_f1={val_metrics['f1']:.4f} false_accept_rate={val_metrics['false_accept_rate']:.4f}")
        if score > best_score:
            best_score = score
            best_state = copy.deepcopy(model.state_dict())
            stale_epochs = 0
        else:
            stale_epochs += 1
            if stale_epochs >= args.patience:
                break

    if best_state is None:
        raise RuntimeError("Training did not produce a checkpoint")
    model.load_state_dict(best_state)
    test_loss, test_metrics = run_epoch(model, loaders_by_split["test"], criterion, device, None)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    plot_history(history, args.output.with_name("rice_leaf_validator_training.png"))
    plot_confusion(test_metrics, args.output.with_name("rice_leaf_validator_confusion_matrix.png"))
    checkpoint = {
        "model_state_dict": model.cpu().state_dict(),
        "class_names": CLASS_NAMES,
        "architecture": "resnet18",
        "input_size": IMAGE_SIZE,
        "normalization": {"mean": MEAN, "std": STD},
        "validation_metrics": {
            "best_score": best_score,
            "epochs_trained": len(history["val_f1"]),
            "history": history,
        },
        "test_metrics": {"loss": test_loss, **test_metrics},
    }
    torch.save(checkpoint, args.output)
    print(json.dumps({"checkpoint": str(args.output), "test_metrics": checkpoint["test_metrics"]}, indent=2))


if __name__ == "__main__":
    main()
