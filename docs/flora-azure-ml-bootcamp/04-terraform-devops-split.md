# Lesson 4: Terraform and Azure DevOps Split

Do not put every ML detail into Terraform.

Use Terraform for infrastructure. Use Azure ML CLI or SDK for fast-changing ML assets.

## Terraform should own

```text
Resource groups
Azure ML workspace
Storage account
Key Vault
Container Registry
Log Analytics
Application Insights
Private Endpoints
Private DNS links
Managed identities
RBAC assignments
Compute instances
CPU/GPU compute clusters
Container Apps environment
Container App web UI shell
```

## Azure ML CLI / SDK should own

```text
Data assets
Environments
Training jobs
ML pipelines
MLflow experiment runs
Model registration
Online endpoint deployments
Endpoint traffic split
Batch inference jobs
Smoke tests
```

## Recommended repository structure

```text
flora-azureml-platform/
|
+-- terraform/
|   +-- modules/
|   |   +-- azure-ml-workspace/
|   |   +-- private-endpoints/
|   |   +-- private-dns/
|   |   +-- storage/
|   |   +-- key-vault/
|   |   +-- acr/
|   |   +-- monitoring/
|   |   +-- compute/
|   |   +-- container-apps/
|   |
|   +-- environments/
|       +-- test/
|       +-- prod/
|
+-- ml/
|   +-- environments/
|   +-- jobs/
|   +-- models/
|   +-- endpoints/
|   +-- batch/
|   +-- src/
|
+-- pipelines/
|   +-- azure-pipelines-iac.yml
|   +-- azure-pipelines-mlops.yml
|
+-- docs/
    +-- architecture.md
    +-- runbook.md
    +-- validation-checklist.md
```

## Golden rule

Terraform builds the factory. Azure ML pipelines run the factory.
