# Secure Pipeline Sample

Use a self hosted agent pool for private Azure ML workspaces.

Recommended checks:

- Check Python
- Check Azure CLI
- Install Azure ML extension
- Validate workspace access
- Submit training job

Example command:

az ml job create --file samples/train-job.yaml --resource-group rg-aml-dev --workspace-name amlws-dev
