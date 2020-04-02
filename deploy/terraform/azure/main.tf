data "azurerm_client_config" "current" {}

module "static_website" {
  source                   = "git::https://github.com/amido/stacks-webapp-template//libs/orchestration/terraform-azurerm-amido-csr?ref=master"
  subscription_id          = var.subscription_id
  tenant_id                = var.tenant_id
  client_id                = var.client_id
  client_secret            = var.client_secret
  rg_name                  = var.rg_name
  resource_location        = var.resource_location
  name_company             = var.name_company
  name_project             = var.name_project
  name_component           = var.name_component
  name_environment         = var.name_environment
  account_replication_type = "LRS"
  account_kind             = "StorageV2"
  account_tier             = "Standard"
}
