# Variraksha FastAPI backend

This backend loads only checkpoints that pass strict state-dict validation
against the architectures used in the training notebook. It uses the notebook's
10-class ordering, 224x224 resize, and ImageNet normalization.

Rice-leaf validation is a separate binary model stage. The existing disease
checkpoints cannot identify unrelated images because a 10-class softmax always
chooses one of those classes.

## Setup

From the project root:

```bash
cd backend
python -m pip install -r requirements.txt
```

The trained `.pth` files belong in `backend/checkpoints/`. The registry only
exposes a checkpoint after it has been loaded into the matching TIMM
architecture with `strict=True`. If no compatible files are present, `/models`
reports the exact reason and `/predict` returns a clear 503; it never returns a
mock result.

## Required rice-leaf validator

This project currently contains no trained binary rice-leaf validator
checkpoint. Add a locally trained
`backend/checkpoints/best_rice_leaf_validator.pth` with:

- TIMM architecture: `resnet18`
- `num_classes=2`
- `class_names=["not_rice_leaf", "rice_leaf"]`
- a `model_state_dict` (or `state_dict`) compatible with that architecture

The training data must include diverse positive rice-leaf images (healthy and
fungal, varied backgrounds and lighting) and hard negatives covering people,
animals, vehicles, buildings, landscapes, food, screenshots, and other plant
leaves. If this checkpoint is absent, `/predict` still runs the verified disease
classifier but reports `"rice_validation": "unavailable"` and does not claim
that unrelated images were rejected. Add the validator before relying on
domain-level upload rejection.

## Train the validator

The repository includes `prepare_validator_dataset.py` and
`train_rice_leaf_validator.py`. First provide the two real source corpora:

```bash
python prepare_validator_dataset.py \
  --rice-root "D:\path\to\kaggle\rice-dataset" \
  --negative-root "D:\path\to\negative-images"
```

Then train and evaluate:

```bash
python train_rice_leaf_validator.py --data ..\validator_dataset
```

If ImageNet weights are not already available locally, use
`--no-pretrained`; the script never creates synthetic images. It reports test
accuracy, precision, recall, F1, confusion-matrix counts, and false-accept
rate, and writes the graphs beside the checkpoint. The checkpoint is written
to `backend/checkpoints/best_rice_leaf_validator.pth` only after real training.

## Run

```bash
cd backend
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Check `http://127.0.0.1:8000/health` and `/models`. The frontend calls `http://127.0.0.1:8000` by default. To select a verified
model for predictions, set `VITE_MODEL_ID` to an ID returned by `/models`, or
call `POST /select-model` with `{"model":"efficientnetv2-s"}`. No external
AI service or API key is used.

## Test a prediction

```bash
curl -X POST http://127.0.0.1:8000/predict -F "image=@path/to/rice-leaf.jpg"
```

The response contains the predicted class, frontend disease ID, percentage
confidence, per-class probabilities, and the verified model name.

When the validator checkpoint is present, it rejects images below its 80%
rice-leaf probability. Disease confidence is always the model's softmax
probability; low-confidence predictions are returned rather than replaced with
mock results.
