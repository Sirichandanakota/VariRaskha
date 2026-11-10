# Model checkpoints

The local `.pth` files in this directory are the trained Kaggle checkpoints.
The API validates each checkpoint against its notebook architecture with strict
state-dict loading before listing it as available. Inference uses only these
local files and does not call an external AI service.
