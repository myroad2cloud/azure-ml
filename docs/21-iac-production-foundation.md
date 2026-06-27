# 21. IaC Production Foundation

## Objective

Create a repeatable Azure Machine Learning foundation using Terraform and Bicep.

## Target resources

- Resource group
- Virtual network and subnets
- Azure ML workspace
- Storage account
- Key Vault
- Azure Container Registry
- Application Insights
- Log Analytics workspace
- Managed identity
- Private Endpoints
- Private DNS zones
- Role assignments
- Diagnostic settings

## Environment strategy

Use separate configuration for Dev, Test, and Prod.

Keep naming, tags, region, network ranges, SKU choices, and access controls environment-specific.

## Deployment sequence

1. Deploy resource group and network
2. Deploy dependency services
3. Deploy Azure ML workspace
4. Deploy private endpoints and DNS
5. Assign RBAC
6. Enable diagnostics
7. Validate access from the self hosted agent

## Production rule

If it cannot be rebuilt from code, it is not production ready.
