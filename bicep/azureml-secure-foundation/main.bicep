@description('Azure region')
param location string = resourceGroup().location

@description('Virtual network name')
param vnetName string = 'vnet-aml-dev'

@description('Private endpoint subnet name')
param privateEndpointSubnetName string = 'snet-private-endpoints'

@description('Storage account name')
param storageAccountName string

@description('Tags')
param tags object = {}

resource vnet 'Microsoft.Network/virtualNetworks@2023-09-01' = {
  name: vnetName
  location: location
  tags: tags
  properties: {
    addressSpace: {
      addressPrefixes: [
        '10.40.0.0/16'
      ]
    }
    subnets: [
      {
        name: privateEndpointSubnetName
        properties: {
          addressPrefix: '10.40.10.0/24'
        }
      }
    ]
  }
}

resource storage 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageAccountName
  location: location
  tags: tags
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
  }
}

output vnetId string = vnet.id
output storageId string = storage.id
