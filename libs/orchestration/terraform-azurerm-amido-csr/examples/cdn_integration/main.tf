data "azurerm_client_config" "current" {}
module "csr_labels" {
  source     = "git::https://github.com/cloudposse/terraform-null-label.git?ref=0.16.0"
  namespace  = "${var.name_company}-${var.name_project}"
  stage      = var.stage
  name       = var.name_component
  attributes = var.attributes
  delimiter  = "-"
  tags       = var.tags
}
module "static_website" {
  source                   = "../../"
  subscription_id          = data.azurerm_client_config.current.subscription_id
  # tenant_id                = var.tenant_id
  # client_id                = var.client_id
  # client_secret            = var.client_secret
  rg_name                  = module.csr_labels.id
  resource_location        = var.resource_location
  name_company             = var.name_company
  name_project             = var.name_project
  name_component           = var.name_component
  name_environment         = var.name_environment
  account_replication_type = "LRS"
  account_kind             = "StorageV2"
  account_tier             = "Standard"
}
