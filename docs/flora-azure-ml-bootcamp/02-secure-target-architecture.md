# Lesson 2: Flora Secure Target Architecture

The confirmed target is a Terraform-built, private-only Azure ML Workbench with model endpoint and web UI access.

## Target pattern

```text
Flora R&D Users
     |
     v
Corporate Network / VPN / ExpressRoute
     |
     v
Private DNS Resolution
     |
     +------------------------+
     |                        |
     v                        v
Azure ML Studio        Internal Web UI
Private Access         Azure Container Apps
     |                        |
     v                        v
Azure ML Workspace --> Managed Online Endpoint
     |
     +--> Compute Instance
     +--> CPU Compute Cluster
     +--> GPU Compute Cluster
     +--> Batch Inference
     +--> MLflow Tracking
     +--> Model Registry
     |
     +--> Storage
     +--> Key Vault
     +--> ACR
     +--> App Insights
     +--> Log Analytics
```

## Private-only rule

Disable public access where required by customer policy:

| Component | Public access | Access pattern |
|---|---:|---|
| Azure ML Workspace | Disabled | Private Endpoint |
| Storage Account | Disabled | Blob/File Private Endpoint |
| Key Vault | Disabled | Private Endpoint |
| Azure Container Registry | Disabled | Private Endpoint |
| Managed Online Endpoint | Private | VNet / private access pattern |
| Azure Container Apps | Internal | Internal environment / private path |

## Practical warning

A private workspace can still fail if dependent services are not reachable.

Common breakpoints:

- Studio cannot load because storage DNS is wrong
- Training job fails because ACR pull is blocked
- Job cannot write artifacts because storage firewall blocks it
- Endpoint fails because identity cannot read model artifacts
- Web UI cannot call endpoint because network path is not validated
