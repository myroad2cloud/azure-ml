# Lesson 9: Azure ML Workspace Internals

This lesson explains what the Azure ML Workspace really is and what can break in a private-only setup.

## Workspace definition

The Azure ML Workspace is the control room for the ML factory.

It manages:

```text
Experiments
Jobs
Pipelines
Data assets
Models
Endpoints
Compute
Datastores
Environments
Access settings
```

The workspace is not where everything is physically stored. It is the control plane. Many files, images, logs, and artifacts live in associated Azure services.

## Workspace dependencies

```text
Azure ML Workspace
  |
  +-- Storage Account       data, artifacts, notebooks, outputs
  +-- Key Vault             secure configuration
  +-- Azure Container Registry container images
  +-- Application Insights  endpoint diagnostics
  +-- Log Analytics         central logs and queries
  +-- Private Endpoints     private network access
  +-- Private DNS           private name resolution
```

## Control plane vs data plane

```text
Control Plane
-------------
Create workspace
Create compute
Submit jobs
Register models
Deploy endpoints
Assign permissions

Data Plane
----------
Read data
Write outputs
Pull images
Run training code
Serve predictions
Log telemetry
```

Most private Azure ML failures happen in the data plane.

Example:

```text
Workspace opens in Studio.
Training job fails.
Why?
Compute cannot pull the image from private ACR,
or cannot write to private Storage.
```

## Private-only workspace architecture

```text
Corporate Network / VPN / ExpressRoute
              |
              v
        Private DNS Zones
              |
              v
+-------------+-----------------------------------+
| Landing Zone VNet                               |
|                                                 |
|  Azure ML Private Endpoint                      |
|  Storage Private Endpoint: Blob/File            |
|  Key Vault Private Endpoint                     |
|  ACR Private Endpoint                           |
|                                                 |
+-------------------------------------------------+
              |
              v
       Azure ML Workspace
              |
              v
 Compute Instance / CPU Cluster / GPU Cluster
```

## Terraform should create

```text
Resource Group
Storage Account
Key Vault
Container Registry Premium
Application Insights
Log Analytics Workspace
Azure ML Workspace
Private Endpoint: Azure ML
Private Endpoint: Storage Blob
Private Endpoint: Storage File
Private Endpoint: Key Vault
Private Endpoint: ACR
Private DNS zone groups
Managed identities
RBAC assignments
Compute Instance
CPU Compute Cluster
GPU Compute Cluster
Image build compute cluster, if needed
```

## Azure ML CLI or SDK should create

```text
Environments
Jobs
MLflow experiments
Data assets
Model registration
Online endpoint deployments
Batch jobs
Smoke tests
```

## Private networking trap

When workspace and ACR are private, image builds can fail unless the image build path is designed.

```text
Public-ish setup:
Azure ML can build images more easily.

Private-only setup:
A dedicated Azure ML compute cluster may be needed
for image builds inside the network.
```

## What can break

| Symptom | Likely cause | Check |
|---|---|---|
| Studio does not load | Azure ML private DNS issue | Azure ML private DNS zones |
| Notebook opens but data fails | Storage DNS, firewall, or RBAC issue | Blob/File DNS, identity, firewall |
| Job fails early | Compute subnet or image pull issue | Compute VNet, ACR private endpoint |
| Image build fails | Private ACR and no image build compute | Image build compute pattern |
| Endpoint deploy fails | Identity cannot pull image or read model | ACR pull, Storage read, endpoint identity |
| Web UI cannot call model | App networking path missing | ACA network, endpoint auth, DNS |
| Logs missing | Monitoring not wired | App Insights and Log Analytics |
| GPU cost surprise | Min nodes not zero | Cluster scaling settings |

## Customer-facing explanation

The Azure ML Workspace is the central control plane for the R&D data science workbench. It manages compute, experiments, models, jobs, pipelines, and endpoints. The workspace uses approved associated services such as Storage, Key Vault, ACR, Application Insights, and Log Analytics. Because the target pattern is private-only, validation must include end-to-end training, image pull, model registration, endpoint deployment, web UI access, and logging.

## Architect warning

Do not say:

> Workspace is deployed, so Azure ML is done.

Say:

> Workspace deployment is one checkpoint. Delivery is complete only when compute, experiment tracking, model registration, endpoint deployment, web UI access, DevOps pipeline execution, and monitoring are validated.
