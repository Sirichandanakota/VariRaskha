# Variraksha

Variraksha uses the locally trained Kaggle PyTorch checkpoints in
`backend/checkpoints/` for rice-leaf disease inference. It does not require an
external AI service or API key.

## Install

Install the frontend dependencies and backend dependencies:

```bash
npm install
cd backend
python -m pip install -r requirements.txt
```

## Run locally

Start the backend from the `backend` directory:

```bash
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

In another terminal, start the React frontend from the project root:

```bash
npm run dev
```

Open the Vite URL shown in the terminal. Upload a rice-leaf image and the
frontend sends it to `http://127.0.0.1:8000/predict`. The backend loads the
matching TIMM architecture, restores the local `.pth` weights, and returns the
predicted disease, confidence, and all class probabilities.

Use `GET http://127.0.0.1:8000/health` to verify the device and loaded models,
or `GET http://127.0.0.1:8000/models` to list verified checkpoints. To select a
model, set `VITE_MODEL_ID` to an ID returned by `/models`, or call
`POST /select-model` with `{"model":"efficientnetv2-s"}`. CUDA is used
automatically when available; otherwise inference runs on CPU.

Rice validation remains fail-closed. The backend requires a separately trained
binary rice-versus-non-rice checkpoint; the disease classifier is never used as
a substitute for that validator.

## Deployment

The frontend and backend are separate services:

1. Deploy the project root as a Vite static site.
2. In Vercel Project Settings > Environment Variables, set
   `VITE_API_BASE_URL` to the public HTTPS URL of the backend, then redeploy.
   Do not use `127.0.0.1` or `localhost` in a production value.
3. Deploy `backend` as a Python ASGI service using:

   ```bash
   pip install -r requirements.txt
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

4. Set `FRONTEND_ORIGINS` on the backend to the exact public frontend origin.
5. Provide the verified `.pth` files in `backend/checkpoints/` through the
   deployment platform's secure artifact or persistent-volume storage. They are
   intentionally excluded from Git because the model files are over 1 GB.

The backend will start without checkpoints, but `/predict` will remain
unavailable until the model files are supplied. The optional
`best_rice_leaf_validator.pth` enables rejection of unrelated images.

The Vercel frontend cannot run the PyTorch backend by itself. The backend must
run as a separate Python service with the checkpoint files available, and its
public URL must be configured as `VITE_API_BASE_URL`. After changing a Vercel
environment variable, create a new deployment; environment variables are
embedded into the frontend during the build.
