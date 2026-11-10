"""Build a leakage-resistant rice-leaf validator dataset from supplied images.

This script never downloads or invents images. The rice source must contain the
ten notebook class directories; the negative source must be a separate corpus.
"""

from __future__ import annotations

import argparse
import hashlib
import random
import shutil
from pathlib import Path

from config import CLASS_NAMES

IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}
SPLITS = (("train", 0.70), ("val", 0.15), ("test", 0.15))


def image_files(root: Path) -> list[Path]:
    return sorted(
        path for path in root.rglob("*")
        if path.is_file() and path.suffix.lower() in IMAGE_SUFFIXES
    )


def digest(path: Path) -> str:
    hasher = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            hasher.update(chunk)
    return hasher.hexdigest()


def unique_files(paths: list[Path]) -> list[Path]:
    seen: set[str] = set()
    result: list[Path] = []
    for path in paths:
        file_digest = digest(path)
        if file_digest not in seen:
            seen.add(file_digest)
            result.append(path)
    return result


def split_paths(paths: list[Path], seed: int) -> dict[str, list[Path]]:
    shuffled = list(paths)
    random.Random(seed).shuffle(shuffled)
    total = len(shuffled)
    train_end = round(total * SPLITS[0][1])
    val_end = train_end + round(total * SPLITS[1][1])
    return {
        "train": shuffled[:train_end],
        "val": shuffled[train_end:val_end],
        "test": shuffled[val_end:],
    }


def copy_split(paths: dict[str, list[Path]], destination: Path, label: str) -> None:
    for split, files in paths.items():
        target = destination / split / label
        target.mkdir(parents=True, exist_ok=True)
        for index, source in enumerate(files):
            output = target / f"{index:06d}_{source.name}"
            shutil.copy2(source, output)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--rice-root", type=Path, required=True)
    parser.add_argument("--negative-root", type=Path, required=True)
    parser.add_argument("--output", type=Path, default=Path("validator_dataset"))
    parser.add_argument("--seed", type=int, default=42)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    missing = [
        name for name in CLASS_NAMES
        if not (args.rice_root / name).is_dir()
    ]
    if missing:
        raise SystemExit(
            "Rice source is missing notebook class directories: " + ", ".join(missing)
        )
    if not args.negative_root.is_dir():
        raise SystemExit(
            "Negative image directory does not exist. Provide a separate corpus "
            "of other leaves and unrelated images."
        )

    positive = unique_files(
        image for name in CLASS_NAMES for image in image_files(args.rice_root / name)
    )
    negative = unique_files(image_files(args.negative_root))
    if not positive:
        raise SystemExit("No rice-leaf images were found in the supplied rice source.")
    if not negative:
        raise SystemExit(
            "No negative images were found. Provide other plant leaves, humans, "
            "animals, vehicles, buildings, landscapes, food, and unrelated objects."
        )

    existing_images = image_files(args.output) if args.output.exists() else []
    if existing_images:
        raise SystemExit(f"Output directory is not empty: {args.output}")
    copy_split(split_paths(positive, args.seed), args.output, "rice_leaf")
    copy_split(split_paths(negative, args.seed + 1), args.output, "not_rice_leaf")
    print(f"Created {args.output} with {len(positive)} positive and {len(negative)} negative images.")


if __name__ == "__main__":
    main()
