# 02. Azure DevOps Foundations

Azure DevOps is the delivery platform for source control, work tracking, build automation, release automation, package storage, and security integration.

For Azure Machine Learning, focus on these areas first:

- Repos
- Pipelines
- Library
- Environments
- Service Connections
- Agent Pools

## Organization

An organization is the top-level Azure DevOps boundary. Use it for a company, business unit, or major platform team.

Recommended settings:

| Area | Recommendation |
|---|---|
| Identity | Connect to Microsoft Entra ID |
| Project visibility | Private |
| Security | Use groups, not direct user assignments |
| Agent pools | Separate build agents by workload |

## Project

A project contains repos, pipelines, boards, and delivery settings.

Recommended project names:

- aml-platform-devops
- customer-mlops-foundation
- enterprise-azureml-delivery

## Repos

Use repos for application code, Azure ML job files, pipeline YAML, infrastructure code, scripts, tests, and documentation.

Recommended folders:

- src
- jobs
- pipelines
- infra
- docs
- scripts
- tests

## Pipelines

Typical Azure ML pipelines include:

- Code validation pipeline
- Training job pipeline
- Model registration pipeline
- Endpoint deployment pipeline
- Infrastructure deployment pipeline

## Common mistakes

- Assigning too much Azure permission
- Keeping secrets in YAML files
- Running deployment manually from laptops
- Ignoring DNS when using Private Endpoints
- Using public agents for private workspaces
