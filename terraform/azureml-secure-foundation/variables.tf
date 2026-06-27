variable "resource_group_name" {
  type = string
}

variable "location" {
  type    = string
  default = "eastus"
}

variable "tenant_id" {
  type = string
}

variable "vnet_name" {
  type    = string
  default = "vnet-aml-dev"
}

variable "vnet_address_space" {
  type    = list(string)
  default = ["10.40.0.0/16"]
}

variable "private_endpoint_subnet_name" {
  type    = string
  default = "snet-private-endpoints"
}

variable "private_endpoint_subnet_prefixes" {
  type    = list(string)
  default = ["10.40.10.0/24"]
}

variable "storage_account_name" {
  type = string
}

variable "key_vault_name" {
  type = string
}

variable "application_insights_name" {
  type = string
}

variable "workspace_name" {
  type = string
}

variable "tags" {
  type    = map(string)
  default = {}
}
