resource "azurerm_cdn_profile" "default" {
  name                = var.resource_namer
  location            = "global"
  resource_group_name = azurerm_resource_group.default.name
  sku                 = "Standard_Microsoft"
  lifecycle {
    ignore_changes = [
      tags,
    ]
  }
}

resource "azurerm_cdn_endpoint" "default" {
  name                = var.resource_namer
  profile_name        = azurerm_cdn_profile.default.name
  location            = "global"
  resource_group_name = azurerm_resource_group.default.name

  origin {
    name      = var.resource_namer
    host_name = azurerm_storage_account.default.primary_web_host
  }
  origin_host_header = azurerm_storage_account.default.primary_web_host
}
