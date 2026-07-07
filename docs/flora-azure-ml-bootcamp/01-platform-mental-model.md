# Lesson 1: Azure ML Platform Mental Model

Azure Machine Learning is not just a notebook tool. It is an enterprise ML platform.

For this project, think of Azure ML as a secure R&D workshop.

```text
R&D Data Scientists
        |
        v
Azure ML Studio / SDK / CLI
        |
        v
Azure ML Workspace
        |
        +--> Compute Instance
        +--> Compute Cluster
        +--> GPU Cluster
        +--> Datastores
        +--> Environments
        +--> Jobs and Pipelines
        +--> Models
        +--> Endpoints
        |
        v
Private Azure Foundation
Storage + Key Vault + ACR + Logs + Private Endpoints + DNS + DevOps
```

## What Azure ML does

Azure ML gives the team a controlled place to:

- Develop notebooks
- Run training jobs
- Track experiments
- Manage compute
- Register models
- Deploy models
- Monitor model serving
- Automate ML workflows

## What Azure ML does not solve alone

Azure ML does not remove the need for:

- Landing zone design
- RBAC ownership
- Private DNS
- Firewall and routing validation
- Data governance
- Key management
- Cost controls
- Operational runbooks

That is where the architect needs to lead.

## Architect view vs data scientist view

| Role | What they see | What you must see |
|---|---|---|
| Data scientist | Notebook, data, model, metrics | Compute, identity, data access, endpoint |
| Security architect | Private access and RBAC | Private endpoints, DNS, Key Vault, ACR |
| Platform architect | Landing zone fit | Terraform, policy, tags, monitoring |
| Project manager | Milestones | Acceptance criteria and dependencies |
