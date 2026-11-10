from dataclasses import dataclass
from pathlib import Path
from threading import Lock, Thread
from typing import Any

import torch
import timm
from torch import nn

from config import (
    CHECKPOINT_DIR,
    CLASS_NAMES,
    DEFAULT_MODEL_ID,
    MODEL_SPECS,
)


@dataclass(frozen=True)
class ModelInfo:
    model_id: str
    display_name: str
    architecture: str
    checkpoint: str


class ModelRegistry:
    def __init__(self) -> None:
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self._models: dict[str, nn.Module] = {}
        self._infos: dict[str, ModelInfo] = {}
        self._errors: dict[str, str] = {}
        self._validator: nn.Module | None = None
        self._validator_error: str | None = None
        self._lock = Lock()
        self._selected_model: str | None = None
        self._ready = False
        torch.set_num_threads(1)

    @property
    def ready(self) -> bool:
        return self._ready

    def start_verification(self) -> None:
        Thread(target=self._verify_in_background, daemon=True).start()

    def _verify_in_background(self) -> None:
        self._verify_checkpoints()
        self._ready = True

    def _checkpoint_payload(self, path: Path) -> dict[str, Any]:
        payload = torch.load(path, map_location="cpu", weights_only=True)
        if not isinstance(payload, dict):
            raise ValueError("checkpoint must contain a dictionary")
        return payload

    def _state_dict(self, payload: dict[str, Any]) -> dict[str, torch.Tensor]:
        state_dict = payload.get("model_state_dict", payload.get("state_dict"))
        if not isinstance(state_dict, dict) or not state_dict:
            raise ValueError("checkpoint has no model_state_dict or state_dict")
        if not all(isinstance(key, str) for key in state_dict):
            raise ValueError("checkpoint state-dict keys must be strings")
        return state_dict

    def _verify_checkpoints(self) -> None:
        CHECKPOINT_DIR.mkdir(parents=True, exist_ok=True)
        model_id = DEFAULT_MODEL_ID
        spec = MODEL_SPECS[model_id]
        checkpoint_path = next(
            (CHECKPOINT_DIR / name for name in spec["filenames"] if (CHECKPOINT_DIR / name).is_file()),
            None,
        )
        if checkpoint_path is None:
            self._errors[model_id] = (
                "No checkpoint found. Expected one of: "
                + ", ".join(spec["filenames"])
            )
            return

        self._infos[model_id] = ModelInfo(
            model_id=model_id,
            display_name=spec["display_name"],
            architecture=spec["architecture"],
            checkpoint=checkpoint_path.name,
        )

    @property
    def validator_ready(self) -> bool:
        return self._validator is not None

    @property
    def validator_error(self) -> str | None:
        return self._validator_error

    def get_validator(self) -> nn.Module:
        if self._validator is None:
            raise RuntimeError(self._validator_error or "Rice-leaf validator is not ready")
        return self._validator

    def available(self) -> list[ModelInfo]:
        return list(self._infos.values())

    def diagnostics(self) -> dict[str, str]:
        return dict(self._errors)

    def info(self, model_id: str) -> ModelInfo:
        info = self._infos.get(model_id)
        if info is None:
            raise ValueError(f"Model '{model_id}' is not verified and cannot be loaded")
        return info

    @property
    def selected_model(self) -> str | None:
        return self._selected_model

    def select(self, model_id: str) -> ModelInfo:
        info = next(
            (candidate for candidate in self._infos.values() if candidate.model_id == model_id),
            None,
        )
        if info is None:
            raise ValueError(f"Model '{model_id}' is not verified and cannot be selected")
        self.get(model_id)
        self._selected_model = model_id
        return info

    def get(self, model_id: str) -> nn.Module:
        info = self.info(model_id)

        with self._lock:
            if model_id not in self._models:
                spec = MODEL_SPECS[model_id]
                checkpoint_path = CHECKPOINT_DIR / info.checkpoint
                payload = self._checkpoint_payload(checkpoint_path)
                model = timm.create_model(
                    spec["architecture"],
                    pretrained=False,
                    num_classes=len(CLASS_NAMES),
                )
                checkpoint_classes = payload.get("class_names")
                if checkpoint_classes is not None and checkpoint_classes != CLASS_NAMES:
                    raise ValueError("checkpoint class_names do not match the notebook ordering")
                model.load_state_dict(self._state_dict(payload), strict=True)
                self._models[model_id] = model.to(self.device).eval()
            return self._models[model_id]
