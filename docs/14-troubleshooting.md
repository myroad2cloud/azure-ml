# 14. Troubleshooting

## First rule

Troubleshoot in layers. Do not start with Azure ML code.

Check identity, network, DNS, workspace access, compute, and then job configuration.

## Common failure areas

| Area | Symptom | What to check |
|---|---|---|
| Identity | Permission denied | Role assignment and service connection |
| DNS | Private endpoint not reached | Name resolves to private IP |
| Network | Timeout | NSG, route table, firewall |
| Agent | Pipeline does not start | Agent pool and worker status |
| Workspace | CLI cannot find workspace | Subscription and resource group |
| Compute | Job queued forever | Compute cluster quota and node state |
| Storage | Job fails during upload | Storage firewall and private endpoint |

## Practical checklist

1. Confirm the self hosted worker is online
2. Confirm Azure sign-in works from the pipeline
3. Confirm workspace commands work
4. Confirm DNS returns private IP addresses
5. Confirm compute cluster exists
6. Confirm job YAML references correct compute
7. Confirm storage access works
8. Confirm logs are available

## Common fixes

- Add missing role assignment
- Link Private DNS zone to the correct VNet
- Allow outbound traffic from the worker
- Install missing CLI extension
- Correct workspace name or resource group
- Increase compute quota
