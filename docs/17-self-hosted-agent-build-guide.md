# 17. Self Hosted Agent Build Guide

## Objective

Build a private Azure DevOps worker that can run Azure ML deployment pipelines inside an Azure virtual network.

## When to use this pattern

Use a self hosted worker when the Azure ML workspace, storage account, container registry, or key vault is reachable only through private endpoints.

A public build worker is fine for learning. It is not enough for locked down enterprise environments.

## Reference design

- One virtual machine for the worker
- One subnet for build workers
- Network access to private endpoints
- Private DNS linked to the virtual network
- Outbound internet or firewall path to Azure DevOps
- Managed identity where supported
- Azure DevOps agent registered into a dedicated pool

## VM baseline

Recommended starting size:

| Setting | Value |
|---|---|
| OS | Windows Server 2022 or Ubuntu LTS |
| Size | 2 vCPU, 8 GB RAM minimum |
| Disk | Premium SSD |
| Subnet | Build agent subnet |
| Public IP | No |
| Access | Bastion or private jump host |

## Required tools

Install:

- Git
- Azure CLI
- Python
- Pip
- Azure ML CLI extension
- Docker if building container images
- PowerShell if Windows based

## Network validation

Before registering the worker, validate:

- DNS resolves private endpoint names to private IPs
- Worker can reach Azure DevOps outbound
- Worker can reach Azure Resource Manager
- Worker can reach Azure ML workspace
- Worker can reach storage, key vault, and container registry

## Agent pool design

Create a dedicated pool such as:

- aml-dev-private-pool
- aml-test-private-pool
- aml-prod-private-pool

Avoid mixing production and non production workers in the same pool.

## Security notes

- Do not install the worker on a developer laptop
- Do not share one worker across unrelated customers
- Patch the worker regularly
- Rotate registration tokens
- Restrict local admin access
- Monitor the worker like a production server

## Troubleshooting

If the pipeline cannot reach Azure ML, first check DNS. Most private endpoint issues are DNS issues, not Azure ML issues.
