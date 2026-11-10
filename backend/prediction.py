from io import BytesIO

import torch
from PIL import Image, UnidentifiedImageError
from torchvision import transforms

from config import (
    CLASS_IDS,
    CLASS_NAMES,
    IMAGE_SIZE,
    MIN_RICE_LEAF_CONFIDENCE,
)
from model_loader import ModelRegistry


transform = transforms.Compose(
    [
        transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225],
        ),
    ]
)


def predict_image(image_bytes: bytes, model_id: str, registry: ModelRegistry) -> dict:
    try:
        with Image.open(BytesIO(image_bytes)) as source:
            if source.width < 64 or source.height < 64:
                raise ValueError("Image dimensions must be at least 64 by 64 pixels.")
            image = source.convert("RGB")
    except (UnidentifiedImageError, OSError) as error:
        raise ValueError("The uploaded file is not a valid image") from error

    tensor = transform(image).unsqueeze(0).to(registry.device)
    rice_validation = "unavailable"
    if registry.validator_ready:
        with torch.inference_mode():
            validation_probabilities = torch.softmax(registry.get_validator()(tensor), dim=1)[0].cpu()

        rice_leaf_confidence = float(validation_probabilities[1])
        if rice_leaf_confidence < MIN_RICE_LEAF_CONFIDENCE:
            raise ValueError("Wrong Image! Please upload a valid rice crop image.")
        rice_validation = "passed"

    model = registry.get(model_id)
    with torch.inference_mode():
        probabilities = torch.softmax(model(tensor), dim=1)[0].cpu()

    confidence, predicted_index = probabilities.max(dim=0)
    predicted_class = CLASS_NAMES[predicted_index.item()]
    return {
        "success": True,
        "valid_rice_leaf": rice_validation == "passed",
        "rice_validation": rice_validation,
        "predicted_class": predicted_class,
        "disease_id": CLASS_IDS[predicted_class],
        "confidence": round(float(confidence) * 100, 2),
        "model": registry.info(model_id).display_name,
        "probabilities": {
            name: round(float(probability) * 100, 4)
            for name, probability in zip(CLASS_NAMES, probabilities)
        },
        "status": "success",
    }
