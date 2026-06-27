# 07. Azure ML Workspace

## Purpose

The Azure ML workspace is the control plane for machine learning assets.

It manages jobs, compute, environments, data assets, models, endpoints, and experiment history.

## Required resources

A workspace normally depends on:

- Storage account
- Key Vault
- Application Insights
- Container Registry

## Compute options

| Compute | Use case |
|---|---|
| Compute instance | Development and experimentation |
| Compute cluster | Training jobs |
| Serverless compute | Simple managed execution |
| Kubernetes attach | Advanced enterprise platform pattern |

## Minimum beginner setup

Create:

- One workspace
- One compute cluster
- One basic training job
- One simple pipeline run from Azure DevOps

## Enterprise setup

For enterprise projects, also design:

- Private networking
- Managed identity
- Customer managed keys when required
- Diagnostic settings
- Role based access
- Environment separation
- Naming and tagging standards

## Common mistakes

- Letting all users become workspace owners
- Mixing development and production assets in one workspace
- Ignoring workspace dependency services
- Not enabling logging early
- Not planning network access before disabling public access
