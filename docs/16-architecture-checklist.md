# 16. Architecture Checklist

## DevOps checklist

- Azure DevOps organization exists
- Project is private
- Repo structure is defined
- Branch protection is enabled
- Build validation is configured
- Release approvals are defined

## Identity checklist

- Service connection is created
- Least privilege roles are assigned
- No personal credentials are used for deployment
- Access is reviewed regularly

## Network checklist

- VNet design is approved
- Subnets are defined
- Private Endpoints are created where required
- Private DNS zones are linked
- Firewall and NSG rules are documented
- DNS is tested from the build worker

## Azure ML checklist

- Workspace is created
- Compute cluster is created
- Storage is configured
- Key Vault is configured
- Container Registry is configured
- Diagnostic settings are enabled

## Pipeline checklist

- CI validates code
- Delivery submits Azure ML jobs
- Model registration is controlled
- Endpoint deployment has approval
- Smoke test exists
- Rollback path is documented

## Operations checklist

- Logs are available
- Alerts are configured
- Cost owner is assigned
- Runbook exists
- Support model is defined
- Production owner is named
