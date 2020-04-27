##################################################
# CosmosDB Resources
##################################################

resource "azurerm_cosmosdb_account" "default" {
  count               = var.create_cosmosdb ? 1 : 0
  name                = var.resource_namer
  resource_group_name = var.resource_group_name
  location            = var.resource_group_location
  offer_type          = var.cosmosdb_offer_type
  kind                = var.cosmosdb_kind

  enable_automatic_failover = true

  consistency_policy {
    consistency_level       = "BoundedStaleness"
    max_interval_in_seconds = 10
    max_staleness_prefix    = 200
  }

  geo_location {
    location          = var.resource_group_location
    failover_priority = 0
  }
  lifecycle {
    ignore_changes = [
      tags,
    ]
  }
}

resource "azurerm_cosmosdb_sql_database" "default" {
  count               = var.create_cosmosdb ? 1 : 0
  name                = var.resource_namer
  resource_group_name = azurerm_cosmosdb_account.default.0.resource_group_name
  account_name        = azurerm_cosmosdb_account.default.0.name
}

# TODO: make this an array of maps
resource "azurerm_cosmosdb_sql_container" "default" {
  count               = var.create_cosmosdb ? 1 : 0
  name                = var.cosmosdb_sql_container
  resource_group_name = azurerm_cosmosdb_account.default.0.resource_group_name
  account_name        = azurerm_cosmosdb_account.default.0.name
  database_name       = azurerm_cosmosdb_sql_database.default.0.name
  partition_key_path  = var.cosmosdb_sql_container_partition_key
}
