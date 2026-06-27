# 19. Production MLOps Pipeline

## Objective

Build a repeatable delivery pipeline for Azure Machine Learning that supports validation, training, model registration, endpoint deployment, smoke testing, and promotion.

## Recommended stages

| Stage | Purpose |
|---|---|
| Validate | Check code, YAML, and basic project structure |
| Train | Submit Azure ML training job |
| Register | Register model artifact with version metadata |
| Deploy Dev | Deploy model to a development endpoint |
| Smoke Test | Confirm endpoint responds correctly |
| Promote Test | Deploy approved model to test |
| Promote Prod | Deploy approved model to production |

## Design rules

- Use source control as the system of record
- Use reusable YAML templates
- Keep environment values outside code
- Use service connections with least privilege
- Use self hosted agents for private workspaces
- Use approvals before production deployment
- Keep rollback simple and tested

## Model promotion

Do not treat every trained model as production ready.

Recommended promotion checks:

- Training job completed
- Metrics meet threshold
- Model artifact exists
- Model registered with clear version
- Security review completed when required
- Endpoint smoke test passed
- Business owner approval completed for production

## Endpoint strategy

Use managed online endpoints for real time inference. Use batch endpoints for offline scoring.

For production, prefer blue green or canary style deployment where traffic can be moved gradually.

## Rollback strategy

Rollback should mean routing traffic back to the previous known good deployment. Do not rely on retraining during an incident.

## Minimum pipeline for this repo

The first implementation should include:

- Basic validation
- Training job submission
- Model registration placeholder
- Endpoint deployment placeholder
- Smoke test placeholder
- Manual approval guidance
