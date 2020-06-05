module "default_label" {
  source     = "git::https://github.com/cloudposse/terraform-null-label.git?ref=0.16.0"
  namespace  = "${var.name_company}-${var.name_project}"
  stage      = var.stage
  name       = var.name_component
  attributes = var.attributes
  delimiter  = "-"
  tags       = var.tags
}

data "azurerm_client_config" "current" {}

module "static_website" {
  source                   = "../../"
  resource_namer           = module.default_label.id
  subscription_id          = data.azurerm_client_config.current.subscription_id
  resource_group_location  = var.resource_group_location
  name_company             = var.name_company
  name_project             = var.name_project
  name_component           = var.name_component
  name_environment         = var.name_environment
  resource_tags            = module.default_label.tags
  account_replication_type = "LRS"
  account_kind             = "StorageV2"
  account_tier             = "Standard"
  dns_zone                 = "csr.nonprod.amidostacks.com"
}
