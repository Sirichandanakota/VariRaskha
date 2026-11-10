from contextlib import asynccontextmanager

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from config import DEFAULT_MODEL_ID, FRONTEND_ORIGINS, MAX_IMAGE_BYTES
from model_loader import ModelRegistry
from prediction import predict_image


registry: ModelRegistry | None = None


@asynccontextmanager
async def lifespan(_: FastAPI):
    global registry
    registry = ModelRegistry()
    registry.start_verification()
    yield
    registry = None


app = FastAPI(title="Variraksha Rice Disease API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=list(FRONTEND_ORIGINS),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ModelSelection(BaseModel):
    model: str


def get_registry(require_ready: bool = True) -> ModelRegistry:
    if registry is None:
        raise HTTPException(status_code=503, detail="Model registry is not ready")
    if require_ready and not registry.ready:
        raise HTTPException(
            status_code=503,
            detail="Models are still loading. Please retry in a few seconds.",
        )
    return registry


@app.get("/health")
def health() -> dict:
    current = get_registry(require_ready=False)
    return {
        "status": "ok" if current.ready else "loading",
        "device": str(current.device),
        "selected_model": current.selected_model,
        "loaded_models": [info.model_id for info in current.available()],
        "unavailable_models": current.diagnostics(),
        "rice_leaf_validator": {
            "ready": current.validator_ready,
            "error": current.validator_error,
        },
    }


@app.get("/models")
def models() -> dict:
    current = get_registry()
    return {
        "models": [
            {
                "id": info.model_id,
                "name": info.display_name,
                "architecture": info.architecture,
                "checkpoint": info.checkpoint,
            }
            for info in current.available()
        ],
        "unavailable": current.diagnostics(),
    }


@app.post("/select-model")
def select_model(selection: ModelSelection) -> dict:
    current = get_registry()
    try:
        info = current.select(selection.model)
    except ValueError as error:
        raise HTTPException(status_code=400, detail="Model is not verified or available") from error
    return {"success": True, "model": info.model_id, "name": info.display_name}


@app.post("/predict")
async def predict(
    image: UploadFile = File(...),
    model: str | None = Form(default=None),
) -> dict:
    current = get_registry()
    selected_model = model or current.selected_model or (
        DEFAULT_MODEL_ID if DEFAULT_MODEL_ID in {info.model_id for info in current.available()} else (
            current.available()[0].model_id if current.available() else None
        )
    )
    if selected_model is None:
        raise HTTPException(status_code=503, detail="No verified model checkpoints are available")

    content = await image.read()
    if len(content) == 0 or len(content) > MAX_IMAGE_BYTES:
        raise HTTPException(status_code=413, detail="Image must be between 1 byte and 10 MB")
    try:
        return predict_image(content, selected_model, current)
    except ValueError as error:
        return JSONResponse(
            status_code=422,
            content={
                "success": False,
                "valid_rice_leaf": False,
                "message": str(error),
            },
        )
    except (RuntimeError, OSError) as error:
        raise HTTPException(status_code=409, detail=str(error)) from error
