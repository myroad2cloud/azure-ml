# 06. Private Networking

## Purpose

Private networking reduces exposure by keeping Azure ML traffic on private IP paths where possible.

## Key components

- Virtual network
- Subnets
- Network security groups
- Route tables
- Azure Firewall when required
- Private Endpoints
- Private DNS zones

## Private Endpoint pattern

Create private endpoints for:

- Azure Machine Learning workspace
- Storage account
- Key Vault
- Container Registry

## DNS is critical

Private Link works only when DNS resolves the service name to the private IP address.

Always validate DNS from the self hosted worker and from Azure ML compute where applicable.

## Validation commands

Use name resolution and connectivity checks from the worker machine.

Check that service names resolve to private addresses, not public addresses.

## Common mistakes

- Creating Private Endpoints but missing Private DNS zones
- Linking DNS zones to the wrong virtual network
- Disabling public access before private access works
- Forgetting storage subresources
- Not testing from the actual build worker
