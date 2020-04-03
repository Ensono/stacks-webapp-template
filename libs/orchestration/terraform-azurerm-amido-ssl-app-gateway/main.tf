resource "azurerm_storage_account" "default" {
  count                    = var.create_ssl_cert ? 1 : 0
  name                     = substr(replace(var.resource_namer, "-", ""), 0, 24)
  resource_group_name      = var.resource_group_name
  location                 = var.resource_group_location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  access_tier              = "Hot"
  enable_https_traffic_only = false
  tags = {}
  lifecycle {
    ignore_changes = [
      tags,
    ]
  }
}

resource "azurerm_storage_container" "default" {
  count                 = var.create_ssl_cert ? 1 : 0
  name                  = "public"
  storage_account_name  = azurerm_storage_account.default.0.name
  container_access_type = "blob" # NEEDS TO BE PUBLIC
}

resource "azurerm_storage_blob" "default" {
  count                 = var.create_ssl_cert ? 1 : 0
  name                   = ".well-known/acme-challenge/test.html"
  storage_account_name   = azurerm_storage_account.default.0.name
  storage_container_name = azurerm_storage_container.default.0.name
  content_type           = "text/html"
  type                   = "Block"
  source                 = "${abspath(path.module)}/data/static/test.html"
}

