data "azurerm_client_config" "current" {}

# Naming convention 
module "default_label" {
  source     = "git::https://github.com/cloudposse/terraform-null-label.git?ref=0.16.0"
  namespace  = format("%s-%s", var.name_company, var.name_project)
  stage      = var.stage
  name       = "${lookup(var.location_name_map, var.resource_group_location, "uksouth")}-${var.name_component}"
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
  source                  = "git::https://github.com/amido/stacks-terraform//azurerm/modules/azurerm-aks?ref=v1.1.0"
  resource_namer          = module.default_label.id
  resource_group_location = var.resource_group_location
  spn_object_id           = data.azurerm_client_config.current.object_id
  tenant_id               = data.azurerm_client_config.current.tenant_id
  cluster_version         = var.cluster_version
  name_environment        = var.name_environment
  name_project            = var.name_project
  name_company            = var.name_company
  name_component          = var.name_component
  create_dns_zone         = var.create_dns_zone
  dns_zone                = var.dns_zone
  internal_dns_zone       = var.internal_dns_zone
  create_acr              = var.create_acr
  acr_registry_name       = replace(module.default_label.id, "-", "")
  # ACR doesn't need to exist across environments
  # creating multiple would break the build once deploy multiple times same binary principle
  acr_resource_group      = var.acr_resource_group == "" ? module.default_label.id : var.acr_resource_group
  create_aksvnet          = var.create_aksvnet
  vnet_name               = module.default_label.id
  vnet_cidr               = var.vnet_cidr
  subnet_front_end_prefix = cidrsubnet(var.vnet_cidr.0, 4, 3)
  subnet_prefixes         = [cidrsubnet(var.vnet_cidr.0, 4, 0)]
  subnet_names            = ["k8s1"]
  aks_ingress_private_ip  = cidrhost(cidrsubnet(var.vnet_cidr.0, 4, 0), -3)
  create_user_identiy     = var.create_user_identiy
  enable_auto_scaling     = true
  log_application_type    = "Node.JS"
}

module "ssl_app_gateway" {
  source                  = "git::https://github.com/amido/stacks-terraform//azurerm/modules/azurerm-app-gateway?ref=v1.1.0"
  resource_namer            = "${module.default_label.id}"
  resource_group_name       = module.aks_bootstrap.resource_group_name
  resource_group_location   = var.resource_group_location
  create_ssl_cert           = true
  vnet_name                 = module.aks_bootstrap.vnet_name
  vnet_cidr                 = var.vnet_cidr
  dns_zone                  = var.dns_zone
  pfx_password              = var.pfx_password
  aks_resource_group        = module.aks_bootstrap.aks_node_resource_group
  aks_ingress_private_ip    = cidrhost(cidrsubnet(var.vnet_cidr.0, 4, 0), -3)
  aks_ingress_public_ip     = module.aks_bootstrap.aks_ingress_public_ip
  subnet_front_end_prefix   = cidrsubnet(var.vnet_cidr.0, 4, 3)
  subnet_backend_end_prefix = cidrsubnet(var.vnet_cidr.0, 4, 4)
  subnet_names              = ["k8s1"]
}

####
# Additional modules need to go here as they can be re-used across app deployments
# Additional user defined resources
####

# e.g. Azure frontdoor etc...
