# 12. Security and Governance

## Purpose

Security and governance make Azure ML safe for enterprise use.

The goal is to control who can access the workspace, how deployments happen, where traffic flows, and how evidence is collected.

## Controls to design

- Microsoft Entra ID groups
- Role based access control
- Managed identity
- Private Endpoints
- Private DNS
- Key Vault
- Azure Policy
- Diagnostic settings
- Defender for Cloud
- Resource locks where appropriate
- Tags and cost allocation

## Minimum roles

Avoid giving everyone Owner or Contributor.

Use workspace-specific roles where possible.

Separate platform administrators, data scientists, ML engineers, security reviewers, and operations teams.

## Governance checklist

- Naming standard defined
- Tagging standard defined
- Public access decision documented
- Private endpoint decision documented
- Logging enabled
- Cost ownership assigned
- Release approval defined
- Backup and recovery expectations documented

## Common mistakes

- One shared admin account
- No separation between development and production
- No audit trail for model promotion
- No cost controls
- No clear owner for endpoints
