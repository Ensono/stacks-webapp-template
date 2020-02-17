data "azurerm_client_config" "current" {}

module "default_label" {
  source     = "git::https://github.com/cloudposse/terraform-null-label.git?ref=0.16.0"
  namespace  = "${var.name_company}-${var.name_project}"
  stage      = var.stage
  name       = var.name_component
  attributes = var.attributes
  delimiter  = "-"
  tags       = var.tags
}
variable "vnet_cidr" {
  default = ["10.0.0.0/16"]
}

module "sample_aks_bootstrap" {
  source                  = "../../"
  create_rg               = true
  resource_group_name     = module.default_label.id
  resource_group_location = "uksouth"
  # subscription_id          = data.azurerm_client_config.current.subscription_id
  # tenant_id                = data.azurerm_client_config.current.tenant_id
  client_id        = data.azurerm_client_config.current.client_id
  client_secret    = var.client_secret
  cluster_version  = "1.15.7"
  name_environment = "dev"
  name_project     = var.name_project
  name_company     = var.name_company
  name_component   = var.name_component
  # account_replication_type = "LRS"
  # account_kind             = "StorageV2"
  # account_tier             = "Standard"
  create_dns_zone        = true
  dns_zone          = "nonprod.amidostacks.com"
  create_acr        = true
  acr_registry_name = module.default_label.id
  create_aksvnet    = true
  vnet_name         = module.default_label.id
  vnet_cidr         = var.vnet_cidr
  subnet_prefixes   = ["${cidrsubnet(var.vnet_cidr, 4, 0)}", "${cidrsubnet(var.vnet_cidr, 4, 1)}", "${cidrsubnet(var.vnet_cidr, 4, 2)}"]
  subnet_names      = ["k8s1", "k8s2", "k8s3"]
  create_aks_spn    = true
  spn_name          = "foo-123"
}
