# 18. Private Endpoint and DNS Guide

## Objective

Connect Azure DevOps pipelines to a private Azure Machine Learning workspace.

## Key point

Private Endpoints depend on DNS. The client must resolve the service name to the private IP address.

For pipeline delivery, the most important client is the self hosted build worker.

## Required private endpoints

Create private endpoints for:

- Azure Machine Learning workspace
- Storage blob service
- Storage file service when used
- Key Vault
- Azure Container Registry

## Common private DNS zones

- privatelink.api.azureml.ms
- privatelink.notebooks.azure.net
- privatelink.blob.core.windows.net
- privatelink.file.core.windows.net
- privatelink.vaultcore.azure.net
- privatelink.azurecr.io

## Validation checklist

From the build worker:

1. Resolve the Azure ML workspace name
2. Confirm the result is a private IP
3. Resolve the storage account blob endpoint
4. Confirm the result is a private IP
5. Resolve Key Vault
6. Resolve Container Registry
7. Run Azure CLI commands against the workspace

## Common failure pattern

The private endpoint exists, but the worker still resolves the public endpoint. This usually means the Private DNS zone is missing or not linked to the worker virtual network.

## Architecture guidance

Use hub and spoke DNS carefully. If DNS is centralized, make sure conditional forwarding is configured so private endpoint names resolve correctly from all required networks.

## Production advice

Do not disable public network access until private DNS and pipeline connectivity are proven from the actual build worker.
