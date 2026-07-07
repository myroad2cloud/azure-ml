# Flora Azure ML Bootcamp Visual Guide

This folder contains the Azure ML learning material created for the Flora R&D Data Science Workbench delivery.

The goal is not to become a data scientist. The goal is to deliver a secure Azure ML Workbench using Terraform, Azure DevOps, private networking, MLOps, model serving, and handover documentation.

## GitHub Page

Open the visual GitHub Pages version after the branch is merged and Pages is deployed:

```text
https://myroad2cloud.github.io/azure-ml/flora-azure-ml-bootcamp.html
```

## Deck

The PowerPoint deck is stored at the repository root as:

```text
Flora_Azure_ML_Bootcamp_Visual_Guide.pptx
```

## Project context from SOW

Flora Food Global Principal B.V. requested a secure Azure Machine Learning based R&D Data Science Workbench inside the existing Azure Landing Zone and Azure environment.

The platform must support:

- 2 R&D data science users
- Approximately 3 ML models
- MB to low/tens-of-GB data volumes
- Intermittent GPU-based model training
- Secure handling of R&D intellectual property
- Controlled application access through web-based user interfaces
- Azure DevOps based CI/CD
- Documentation, runbook, and knowledge transfer

## What needs to be delivered

```text
Azure ML Workbench
  |
  +-- Azure ML Workspace
  +-- Compute Instances
  +-- CPU Compute Clusters
  +-- GPU Compute Clusters
  +-- MLflow experiment tracking
  +-- Model Registry
  +-- Managed Online Endpoints
  +-- Batch Inference
  +-- Azure Container Apps Web UI
  +-- Azure DevOps CI/CD
  +-- Logging and monitoring
  +-- Documentation and handover
```

## Learning path

| Lesson | Topic | Why it matters |
|---:|---|---|
| 1 | Azure ML platform mental model | Understand the platform before touching Terraform |
| 2 | Secure target architecture | Align with private-only customer landing zone |
| 3 | SOW delivery map | Know what is in scope and what is not |
| 4 | Terraform and Azure DevOps split | Make the delivery repeatable without overloading Terraform |
| 5 | Compute model | Explain compute instance, CPU cluster, and GPU cluster |
| 6 | MLflow, model registry, and endpoints | Meet tracking, lifecycle, and serving acceptance criteria |
| 7 | Azure Container Apps web UI | Provide controlled web-based access |
| 8 | Validation and handover | Close the project with evidence |
| 9 | Workspace internals | Know what Azure ML creates, depends on, and what can break |

## Key architecture rule

Public access should be disabled for the Azure ML Workspace, Storage Account, Key Vault, and Azure Container Registry when required by the customer. Access should be through Private Endpoints, Private DNS, managed identities, and RBAC.

## Client-safe positioning

Use this wording when discussing scope boundaries:

> We will deploy and validate the Azure ML solution so it is technically compatible with the customer landing zone, RBAC, private endpoint, DNS, and governance standards. Customer remains owner of security policy, access model, compliance controls, data governance, and ongoing operations.

## Quick mental model

```text
Azure ML Workspace = R&D Lab Building
Compute Instance   = Scientist's personal desk
Compute Cluster    = Shared lab machines
GPU Cluster        = Expensive super machine
Storage            = Sample freezer
Key Vault          = Secret locker
ACR                = Packaging room
MLflow             = Experiment diary
Model Registry     = Approved recipe shelf
Online Endpoint    = Serving counter
Container Apps     = Web tasting window
Terraform          = Construction blueprint
Azure DevOps       = Site supervisor
```
