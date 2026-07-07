# Lesson 8: Validation and Handover

Your project is done when you can prove the platform works.

## Validation checklist

| Area | Evidence |
|---|---|
| Workspace | Accessible from approved private path |
| Compute Instance | User can open notebook |
| CPU Cluster | Sample job runs |
| GPU Cluster | Cluster can be created or job validated if quota exists |
| MLflow | Experiment run visible |
| Model Registry | Sample model registered |
| Endpoint | Sample model deployed |
| Web UI | UI can call endpoint |
| Batch | Batch scoring job runs or capability documented |
| Storage | Artifacts written and read |
| Key Vault | Identity can access required secrets |
| ACR | Images can be pulled privately |
| Monitoring | Logs visible in App Insights / Log Analytics |
| DevOps | Pipeline runs successfully |

## Handover package

- Architecture design document
- Deployment guide
- Configuration guide
- Operational runbook
- Validation evidence
- Known limitations
- Cost control notes
- KT session material

## Client-safe closure line

The platform has been deployed and validated in the customer-provided Azure test environment. Ongoing operation, access policy ownership, security monitoring, and compliance reporting remain with the customer unless covered by a separate managed services agreement.
