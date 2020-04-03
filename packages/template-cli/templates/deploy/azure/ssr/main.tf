data "azurerm_client_config" "current" {}

# Naming convention 
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

module "aks_bootstrap" {
  source                  = "git::https://github.com/amido/stacks-webapp-template//libs/orchestration/terraform-azurerm-amido-aks?ref=feat/1435"
  resource_namer          = module.default_label.id
  create_rg               = true
  resource_group_location = var.resource_group_location
  client_id               = data.azurerm_client_config.current.client_id
  spn_object_id           = data.azurerm_client_config.current.object_id
  client_secret           = var.client_secret
  tenant_id               = data.azurerm_client_config.current.tenant_id
  cluster_version         = "1.15.7"
  name_environment        = "nonprod"
  name_project            = var.name_project
  name_company            = var.name_company
  name_component          = var.name_component
  create_dns_zone         = true
  dns_zone                = var.dns_zone
  internal_dns_zone       = var.internal_dns_zone
  create_acr              = true
  acr_registry_name       = replace(module.default_label.id, "-", "")
  create_aksvnet          = true
  vnet_name               = module.default_label.id
  vnet_cidr               = var.vnet_cidr
  subnet_front_end_prefix = cidrsubnet(var.vnet_cidr.0, 4, 3)
  subnet_prefixes         = ["${cidrsubnet(var.vnet_cidr.0, 4, 0)}", "${cidrsubnet(var.vnet_cidr.0, 4, 1)}", "${cidrsubnet(var.vnet_cidr.0, 4, 2)}"]
  subnet_names            = ["k8s1", "k8s2", "k8s3"]
  create_aks_spn          = true
  enable_auto_scaling     = true
  log_application_type    = "Node.JS"
}

module "ssl_app_gateway" {
  source                  = "git::https://github.com/amido/stacks-webapp-template//libs/orchestration/terraform-azurerm-amido-ssl-app-gateway?ref=feat/1435"
  resource_namer            = "${module.default_label.id}-ssl"
  resource_group_name       = module.aks_bootstrap.resource_group_name
  resource_group_location   = var.resource_group_location
  create_ssl_cert           = true
  vnet_name                 = module.aks_bootstrap.vnet_name
  vnet_cidr                 = var.vnet_cidr
  dns_zone                  = var.dns_zone
  pfx_password              = var.pfx_password
  aks_resource_group        = module.aks_bootstrap.aks_node_resource_group
  subnet_front_end_prefix   = cidrsubnet(var.vnet_cidr.0, 4, 3)
  subnet_backend_end_prefix = cidrsubnet(var.vnet_cidr.0, 4, 4)
  subnet_names              = ["k8s1", "k8s2", "k8s3"]
}
