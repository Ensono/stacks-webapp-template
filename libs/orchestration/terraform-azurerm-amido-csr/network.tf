# Always create and manage an RG as part of this library
resource "azurerm_resource_group" "default" {
  name     = var.resource_namer
  location = var.resource_group_location
  tags     = var.resource_tags
  lifecycle {
    ignore_changes = [
      tags,
    ]
  }
}

locals {
  app_hostname = "${var.dns_record}.${var.dns_zone}"
  dns_rg_name  = var.create_dns_zone ? azurerm_resource_group.default.name : var.dns_resource_group
}

# DNS
resource "azurerm_dns_zone" "default" {
  count               = var.create_dns_zone ? 1 : 0
  name                = local.app_hostname
  resource_group_name = azurerm_resource_group.default.name
  depends_on          = [azurerm_resource_group.default]
  lifecycle {
    ignore_changes = [
      tags,
    ]
  }
}

resource "azurerm_dns_cname_record" "default" {
  name                = var.dns_record
  zone_name           = var.dns_zone
  resource_group_name = local.dns_rg_name
  ttl                 = 300
  record              = azurerm_cdn_endpoint.default.host_name
}
