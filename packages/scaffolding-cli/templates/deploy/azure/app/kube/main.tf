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

module "app" {
  source                               = "git::https://github.com/amido/stacks-terraform//azurerm/modules/azurerm-server-side-app?ref=v1.3.1"
  create_cosmosdb                      = var.create_cosmosdb
  resource_namer                       = module.default_label.id
  resource_tags                        = module.default_label.tags
  resource_group_location              = var.resource_group_location
  create_cache                         = var.create_cache
  create_dns_record                    = var.create_dns_record
  dns_record                           = var.dns_record
  dns_zone_name                        = var.dns_zone_name
  dns_zone_resource_group              = var.dns_zone_resource_group != "" ? var.dns_zone_resource_group : var.core_resource_group
  dns_a_records                        = [data.azurerm_public_ip.app_gateway.ip_address]
  cdn_profile_name                     = var.cdn_profile_name
  create_cdn_endpoint                  = var.create_cdn_endpoint
  subscription_id                      = data.azurerm_client_config.current.subscription_id
  # Alternatively if you want you can pass in the IP directly
  # dns_a_records                        = ["0.1.23.45"]
}
