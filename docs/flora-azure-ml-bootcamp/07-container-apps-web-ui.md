# Lesson 7: Web UI and Azure Container Apps

The SOW includes controlled application access through web-based user interfaces and Azure Container Apps.

## Recommended simple pattern

```text
Approved User
   |
   v
Internal Azure Container Apps Web UI
   |
   v
Private Managed Online Endpoint
   |
   v
Azure ML Model Deployment
```

## What the web UI should do in the baseline

Keep it small for delivery:

- Accept sample input
- Call the model endpoint
- Show prediction output
- Log request and response metadata
- Avoid storing sensitive data unless required

## What not to build

Do not build a full product platform unless change control expands scope.

Avoid:

- Full user management system
- Large-scale app modernization
- Data lakehouse
- Databricks
- Production-grade business application
- Ongoing support model

## Architecture stance

The web UI is a validation and controlled access layer for the deployed model. It is not an enterprise application transformation.
