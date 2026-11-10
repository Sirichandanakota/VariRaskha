# Rice-leaf validator dataset

This directory is intentionally empty of images. Do not copy the ten-class
disease checkpoint files here and do not use fabricated or mock images.

The required layout is:

```text
validator_dataset/
  train/
    rice_leaf/
    not_rice_leaf/
  val/
    rice_leaf/
    not_rice_leaf/
  test/
    rice_leaf/
    not_rice_leaf/
```

Use `backend/prepare_validator_dataset.py` to create the layout from:

1. The Kaggle rice dataset root containing the ten class directories.
2. A separate negative image corpus containing other plant leaves, people,
   animals, vehicles, buildings, landscapes, food, screenshots, and unrelated
   objects.

The script removes exact duplicate files before splitting deterministically.
