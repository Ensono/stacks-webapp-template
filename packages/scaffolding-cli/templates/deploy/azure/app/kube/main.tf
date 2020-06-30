########
# Application level stuff will live here
# Each module is conditionally created within this app infra definition interface and can be re-used across app types e.g. SSR webapp, API only
########

data "azurerm_client_config" "current" {}

# Naming convention 
module "default_label" {
  source     = "git::https://github.com/cloudposse/terraform-null-label.git?ref=0.16.0"
  namespace  = "${var.name_company}-${var.name_project}"
  stage      = var.stage
  name       = "${lookup(var.location_name_map, var.resource_group_location, "uksouth")}-${var.name_component}"
  attributes = var.attributes
  delimiter  = "-"
  tags       = var.tags
}

locals {
  create_resource_group = var.use_existing_resource_group && var.resource_group_name != "" ? false : true
  resource_group_name = var.use_existing_resource_group && var.resource_group_name != "" ? var.resource_group_name : module.default_label.id
}

resource "azurerm_resource_group" "default" {
  count    = local.create_resource_group ? 1 : 0
  name     = local.resource_group_name
  location = var.resource_group_location
  tags     = var.tags
}

####
# app level DNS can/should be controlled from here
# an alternative way of managing this would be through K8s operators
# [TODO]: examples can be found in the deploy folders
#### 
resource "azurerm_dns_a_record" "default" {
  name                = var.dns_record
  zone_name           = var.dns_zone_name
  resource_group_name = local.resource_group_name
  ttl                 = 300
  records             = [data.azurerm_public_ip.app_gateway.ip_address]
}

module "cosmosdb" {
  source                               = "git::https://github.com/amido/stacks-terraform//azurerm/modules/azurerm-cosmosdb?ref=v1.1.0"
  create_cosmosdb                      = var.create_cosmosdb
  resource_namer                       = module.default_label.id
  name_environment                     = "dev-feature"
  name_project                         = var.name_project
  name_company                         = var.name_company
  name_component                       = var.name_component
  resource_group_name                  = local.resource_group_name
  cosmosdb_sql_container               = "Menu"
  cosmosdb_sql_container_partition_key = "/id"
  cosmosdb_kind                        = "GlobalDocumentDB"
  cosmosdb_offer_type                  = "Standard"
}

####
# Additional modules need to go here as they can be re-used across app deployments
#### 
# module "observability" {
#   source = "git://...." 
# }

#### 
# Additional user defined resources or modules can go here
####
resource "azurerm_redis_cache" "default" {
  count               = var.create_cache ? 1 : 0
  name                = module.default_label.id
  location            = var.resource_group_location
  resource_group_name = local.resource_group_name
  capacity            = 2
  family              = "C"
  sku_name            = "Standard"
  enable_non_ssl_port = false
  minimum_tls_version = "1.2"

  redis_configuration {
    enable_authentication = true
    maxmemory_reserved = 2
    maxmemory_delta    = 2
    maxmemory_policy   = "allkeys-lru"
  }
}
