# Managed Online Endpoint

## Purpose

Deploy a registered model as a real time inference endpoint.

## Components

- Endpoint
- Deployment
- Model
- Environment
- Scoring script
- Instance type
- Traffic allocation

## Example deployment flow

1. Create endpoint
2. Create deployment
3. Route test traffic
4. Run smoke test
5. Move production traffic

## Smoke test

A smoke test should confirm:

- Endpoint is reachable
- Authentication works
- Response schema is valid
- Latency is acceptable
- Logs are generated

## Rollback

Keep the previous deployment available until the new deployment is proven. Rollback by routing traffic back to the previous deployment.
