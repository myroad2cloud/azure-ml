# 05. Self Hosted Agents

## Why they matter

A hosted build machine on the public internet cannot reliably reach private Azure resources.

For secure Azure ML workspaces, place the build machine inside the same network path as the private resources.

## Recommended design

Use a small virtual machine in Azure as the build worker.

Place it in a subnet that can resolve private names and reach private endpoints.

Install the required tools:

- Git
- Azure CLI
- Python
- Docker when image build is needed
- Azure ML command extension

## Network requirements

The worker needs outbound access to Azure DevOps and access to private Azure services.

For strict environments, route traffic through Azure Firewall and allow only required destinations.

## Validation

From the worker, confirm:

- It can resolve the Azure ML workspace private name
- It can reach the storage account private endpoint
- It can reach the container registry private endpoint
- It can run Azure CLI commands
- It appears online in the agent pool

## Common issues

- DNS points to public address instead of private address
- Network security group blocks traffic
- Firewall blocks outbound DevOps connectivity
- Required tools are missing
- The worker has no permission in Azure
