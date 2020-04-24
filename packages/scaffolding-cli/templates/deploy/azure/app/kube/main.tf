########
# Application level stuff will live here   
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

# We are keeping this as a lookup
# since proper conventions for naming of resources should be followed 
# and things can always be looked up without resorting to cross state searches
data "azurerm_public_ip" "app_gateway" {
  name                = var.app_gateway_frontend_ip_name
  resource_group_name = var.resource_group_name
}

####
# TODO: build out application level modules 
# e.g. cosmos, DNS, redis, etc.. 
#### 
resource "azurerm_dns_a_record" "example" {
  name                = var.dns_record
  zone_name           = var.dns_zone_name
  resource_group_name = var.resource_group_name
  ttl                 = 300
  records             = [data.azurerm_public_ip.app_gateway.ip_address]
}

####
# Additional modules need to go here as they can be re-used across app deployments
#### 
# module "observability" {
#   source = "git://...." 
# }

module "cosmosdb" {
  source                               = "../../"
  create_cosmosdb                      = var.create_cosmosdb
  resource_namer                       = module.default_label.id
  name_environment                     = "dev-feature"
  name_project                         = var.name_project
  name_company                         = var.name_company
  name_component                       = var.name_component
  resource_group_name                  = azurerm_resource_group.default.name
  cosmosdb_sql_container               = "Menu"
  cosmosdb_sql_container_partition_key = "/id"
  cosmosdb_kind                        = "GlobalDocumentDB"
  cosmosdb_offer_type                  = "Standard"
}

# Additional user defined resources or modules can go here
