# Register Model

This folder documents the model registration step for the MLOps pipeline.

## Purpose

Register a trained model artifact into Azure Machine Learning with traceable metadata.

## Required inputs

- Model name
- Model path
- Training job ID
- Git commit SHA
- Metrics summary
- Environment name

## Example command

```bash
az ml model create \
  --name my-model \
  --path ./outputs/model \
  --type custom_model \
  --resource-group rg-aml-dev \
  --workspace-name amlws-dev
```

## Production guidance

Do not register every experiment output as a production candidate. Apply quality gates first.
