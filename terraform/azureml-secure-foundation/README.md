# Terraform Azure ML Secure Foundation

This is a starter Terraform layout for a secure Azure Machine Learning foundation.

It currently creates:

- Resource group
- Virtual network
- Private endpoint subnet
- Storage account

Extend this module with:

- Key Vault
- Application Insights
- Azure Container Registry
- Azure ML workspace
- Private Endpoints
- Private DNS zones
- Role assignments
- Diagnostic settings

## Usage

```bash
terraform init
terraform plan
terraform apply
```

## Production notes

Do not use this as-is for production. Add remote state, environment variables, RBAC, policy controls, naming standards, and private networking validation.
