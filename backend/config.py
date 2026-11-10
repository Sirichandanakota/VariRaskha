from pathlib import Path
import os


BACKEND_DIR = Path(__file__).resolve().parent
CHECKPOINT_DIR = BACKEND_DIR / "checkpoints"
_configured_origins = os.getenv("FRONTEND_ORIGINS", "")
FRONTEND_ORIGINS = tuple(
    origin.strip()
    for origin in _configured_origins.split(",")
    if origin.strip()
) or (
    "http://localhost:5173",
    "http://127.0.0.1:5173",
)

CLASS_NAMES = [
    "Bakanae",
    "Brown Spot",
    "False Smut",
    "Healthy",
    "Leaf Blast",
    "Leaf Scald",
    "Narrow Brown Spot",
    "Neck Blast",
    "Sheath Blight",
    "Stem Rot",
]

CLASS_IDS = {
    "Bakanae": "bakanae",
    "Brown Spot": "brown-spot",
    "False Smut": "false-smut",
    "Healthy": "healthy",
    "Leaf Blast": "leaf-blast",
    "Leaf Scald": "leaf-scald",
    "Narrow Brown Spot": "narrow-brown-spot",
    "Neck Blast": "neck-blast",
    "Sheath Blight": "sheath-blight",
    "Stem Rot": "stem-rot",
}

MODEL_SPECS = {
    "efficientnetv2-s-reconstructed": {
        "display_name": "EfficientNetV2-S (reconstructed)",
        "architecture": "efficientnetv2_s",
        "filenames": ("best_efficientnetv2_s_reconstructed.pth",),
    },
    "efficientnetv2-s": {
        "display_name": "EfficientNetV2-S",
        "architecture": "efficientnetv2_s",
        "filenames": ("best_efficientnetv2-s.pth",),
    },
    "convnext-tiny": {
        "display_name": "ConvNeXt-Tiny",
        "architecture": "convnext_tiny",
        "filenames": (
            "best_convnext_tiny.pth",
            "best_convnext_tiny_fresh.pth",
            "best_convnext_tiny_reconstructed.pth",
        ),
    },
    "swin-tiny": {
        "display_name": "Swin-Tiny",
        "architecture": "swin_tiny_patch4_window7_224",
        "filenames": ("best_swin_tiny_fresh.pth",),
    },
}

DEFAULT_MODEL_ID = "efficientnetv2-s"

RICE_LEAF_VALIDATOR_SPEC = {
    "display_name": "Rice Leaf Validator",
    "architecture": "resnet18",
    "filenames": ("best_rice_leaf_validator.pth",),
}
RICE_LEAF_VALIDATOR_CLASSES = ["not_rice_leaf", "rice_leaf"]

IMAGE_SIZE = 224
MAX_IMAGE_BYTES = 10 * 1024 * 1024
MIN_PREDICTION_CONFIDENCE = 0.55
MIN_RICE_LEAF_CONFIDENCE = 0.80
