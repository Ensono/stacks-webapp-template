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
# if you do not set the 
# `service_cidr`
# `dns_service_ip`
# `docker_bridge_cidr` 
# AKS will default to ==> 10.0.0.0/16
variable "vnet_cidr" {
  default = ["10.1.0.0/16"]
}

module "sample_aks_bootstrap" {
  source                  = "../../"
  resource_namer          = module.default_label.id
  create_rg               = true
  resource_group_name     = module.default_label.id
  resource_group_location = "uksouth"
  client_id               = data.azurerm_client_config.current.client_id
  spn_object_id               = data.azurerm_client_config.current.object_id
  client_secret           = var.client_secret
  # client_id            = var.create_aksspn ? module.aks-spn.spn_applicationid : var.cluster_spn_clientid
  # client_secret        = var.create_aksspn ? random_string.spn_password.0.result : var.cluster_spn_clientsecret
  cluster_version      = "1.15.7"
  name_environment     = "dev"
  name_project         = var.name_project
  name_company         = var.name_company
  name_component       = var.name_component
  create_dns_zone      = true
  dns_zone             = "nonprod.amidostacks.com"
  internal_dns_zone    = "nonprod.amidostacks.internal"
  create_acr           = true
  acr_registry_name    = replace(module.default_label.id, "-", "")
  create_aksvnet       = true
  vnet_name            = module.default_label.id
  vnet_cidr            = var.vnet_cidr
  subnet_prefixes      = ["${cidrsubnet(var.vnet_cidr.0, 4, 0)}", "${cidrsubnet(var.vnet_cidr.0, 4, 1)}", "${cidrsubnet(var.vnet_cidr.0, 4, 2)}"]
  subnet_names         = ["k8s1", "k8s2", "k8s3"]
  create_aks_spn       = true
  spn_name             = "foo-123"
  enable_auto_scaling  = true
  log_application_type = "Node.JS"
}
