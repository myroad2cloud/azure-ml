# Lesson 3: SOW Delivery Map

The SOW is the delivery contract. Learn Azure ML according to what must be accepted.

## In-scope platform components

- Azure Machine Learning Workspace
- Compute Instances
- CPU Compute Clusters
- GPU Compute Clusters
- MLflow integration
- Model Registry
- Managed Online Endpoints
- Batch Inference capability
- Azure Container Apps
- Azure Container Registry
- Azure Key Vault
- Azure Storage
- Application Insights
- Log Analytics

## Acceptance criteria translated into engineering tasks

| SOW acceptance point | Engineering task |
|---|---|
| Workspace deployed and accessible | Deploy Azure ML workspace and validate private access |
| Compute Instances operational | Create CI for R&D users and validate notebooks |
| CPU/GPU clusters functional | Deploy autoscaling clusters with min nodes 0 |
| Experiments tracked | Run sample job with MLflow |
| Models registered | Register a sample model in registry |
| DevOps pipeline executes deployment | Build CI/CD pipeline for training/deployment |
| At least one model deployed | Deploy sample model to managed online endpoint |
| Web app access available | Deploy ACA web UI connected to endpoint |
| Monitoring operational | Validate App Insights and Log Analytics |

## Milestone view

```text
Week 1: MS1 + MS2
- Kickoff
- Access readiness
- Design confirmation
- Secure workbench foundation

Week 2: MS2 + MS3
- Platform setup
- Compute setup
- MLOps baseline

Week 3: MS3
- Endpoint setup
- Observability
- Web UI validation

Week 4: MS4
- Validation
- Knowledge transfer
- Handover
```

## Scope boundary

Rackspace aligns to customer-defined RBAC, network security, and data access patterns. Customer retains ownership of policy definition, enforcement, compliance, key lifecycle, and ongoing operations.
