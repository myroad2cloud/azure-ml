# Flora Food Group – Azure ML Workbench Deliverables

**SOW:** Account #5760629 / Opportunity #4626144  
**Prepared by:** Rackspace Technology – Azure Cloud Architecture Team  
**Version:** v1.0 | 26 June 2026  
**Classification:** CONFIDENTIAL

---

## Contents

| File | Description |
|------|-------------|
| [`Flora_AzureML_Detailed_Design_Document.docx`](Flora_AzureML_Detailed_Design_Document.docx) | 13-section Detailed Design Document covering all Azure ML components, network security, IAM, MLOps pipelines, governance, risk register, and operational runbook |
| [`Flora_AzureML_LowLevel_Design.xlsx`](Flora_AzureML_LowLevel_Design.xlsx) | 12-sheet Low Level Design workbook: Resource inventory, Network (NSG/PE/VPN), Security (RBAC/Firewall/Policy), Compute, Storage, MLOps, Monitoring, Naming convention, Milestones/RACI, Risks, Cost estimate |
| [`Flora_AzureML_Architecture_Diagram.png`](Flora_AzureML_Architecture_Diagram.png) | Solution Architecture diagram (Azure icons) – end-to-end component view |
| [`Flora_AzureML_Network_Architecture.png`](Flora_AzureML_Network_Architecture.png) | Network Architecture diagram – S2S VPN, Azure Firewall, Private Endpoints, Private DNS Resolvers |

---

## Solution Summary

| Attribute | Value |
|-----------|-------|
| Customer | Flora Food Global Principal B.V. |
| Platform | Azure Machine Learning (Azure ML) |
| Users | 2 R&D Data Scientists |
| Models | ~3 ML models |
| Data Volume | MB to low-GB |
| Access Model | Private endpoints only – no public access |
| Compute | On-demand CPU + GPU clusters (scale-to-zero) |
| DevOps | Azure DevOps CI/CD (Customer tenant) |
| Total Fee | EUR 20,000 (4 milestones) |

---

## Architecture Highlights

- **Azure Landing Zone** – Hub-and-Spoke topology; AML deployed as a spoke
- **Private Endpoints** – All PaaS services (AML, Storage, Key Vault, ACR) accessed privately
- **Site-to-Site VPN** – IKEv2 active-passive dual tunnels; BGP-enabled
- **Azure Firewall Premium** – All AML egress inspected; deny-by-default
- **Private DNS Resolver** – Split-horizon DNS for on-premises to Azure privatelink resolution
- **MLOps** – Full lifecycle: train → register → stage → deploy via Azure DevOps pipelines
- **Monitoring** – Log Analytics + Application Insights + Azure Monitor alerts + data drift detection

---

*This document is CONFIDENTIAL and intended solely for Flora Food Global Principal B.V. and Rackspace Technology authorised personnel.*
