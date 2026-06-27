# 20. Model Registry and Endpoints

## Model registry

The model registry stores named and versioned model artifacts.

A registered model should include enough metadata to support traceability:

- Model name
- Model version
- Training job ID
- Git commit SHA
- Dataset reference
- Metrics
- Owner
- Approval status

## Why registry matters

Without a registry, teams lose control over which model is deployed, who approved it, and how to roll back.

## Managed online endpoints

Use managed online endpoints for real time inference.

Typical components:

- Endpoint
- Deployment
- Model
- Environment
- Scoring script
- Instance type
- Traffic allocation

## Batch endpoints

Use batch endpoints for large offline scoring workloads.

Typical use cases:

- Daily scoring
- Bulk predictions
- Back office processing
- Data science evaluation jobs

## Promotion pattern

Dev endpoint validates technical deployment.

Test endpoint validates functional and performance expectations.

Prod endpoint serves real consumers.

## Production checklist

- Endpoint authentication enabled
- Network access reviewed
- Instance size approved
- Autoscale and quota reviewed
- Logs enabled
- Smoke test documented
- Rollback target known
- Cost owner assigned
