# 11. Infrastructure as Code

## Purpose

Infrastructure as Code makes the Azure ML platform repeatable.

Use it to create and manage resource groups, workspace dependencies, private networking, role assignments, and monitoring settings.

## Recommended tools

- Terraform for multi-cloud and enterprise platform teams
- Bicep for Azure-native implementation
- Azure CLI for quick validation and scripts

## What to automate

- Resource group
- Azure ML workspace
- Storage account
- Key Vault
- Container Registry
- Application Insights
- Log Analytics workspace
- Private Endpoints
- Private DNS zones
- Role assignments
- Compute cluster where supported

## What not to hardcode

- Subscription IDs
- Tenant IDs
- Passwords
- Region-specific names without variables
- Environment-specific values inside reusable modules

## Module strategy

Use small modules:

- network
- private endpoints
- workspace
- monitoring
- roles
- compute

## Common mistakes

- Creating resources manually and calling it production
- No state management
- No naming standard
- No tagging standard
- No separate variables per environment
