# Lesson 6: MLOps, MLflow, Model Registry, Endpoint

## MLflow

MLflow is the experiment diary.

It tracks:

- Run ID
- Code version
- Parameters
- Metrics
- Output artifacts
- Model files

Example:

```text
Experiment: flora-sample-model
Run 1: accuracy 0.81
Run 2: accuracy 0.86
Run 3: accuracy 0.84

Best model: Run 2
```

## Model Registry

Model Registry is the approved model shelf.

Example:

```text
flora-sample-model:v1
flora-sample-model:v2
flora-sample-model:v3
```

Use it to prove lifecycle management:

- trained
- registered
- versioned
- deployed

## Managed Online Endpoint

Managed Online Endpoint is the real-time scoring API.

Flow:

```text
Web UI
  |
  v
Managed Online Endpoint
  |
  v
Model Deployment
  |
  v
Prediction
```

## Batch Inference

Batch inference is offline scoring.

Example:

```text
Input: 10,000 product sample records
Output: 10,000 prediction rows
```

Use batch inference when instant response is not needed.
