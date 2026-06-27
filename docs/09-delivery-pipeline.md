# 09. Delivery Pipeline

## Purpose

The delivery pipeline moves validated changes into Azure Machine Learning.

Typical actions include job submission, model registration, endpoint deployment, and smoke testing.

## Basic flow

1. Download validated artifact
2. Connect to Azure through the configured connection
3. Select the target workspace
4. Submit the Azure ML job
5. Register the model
6. Deploy to an endpoint
7. Run smoke tests
8. Promote after approval

## Environments

Use separate stages for Dev, Test, UAT, and Prod.

Production should require approval.

## Common mistakes

- Deploying straight to production
- No smoke test after deployment
- No approval gate
- No rollback plan
- No separation between training and serving environments
