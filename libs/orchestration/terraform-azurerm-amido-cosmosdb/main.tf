##################################################
# ResourceGroups
##################################################

resource "azurerm_resource_group" "default" {
  name     = local.resource_group_name_env
  location = var.resource_group_location_env
  tags     = var.resource_group_tags
}

##################################################
# CosmosDB Resources
##################################################

resource "azurerm_cosmosdb_account" "default" {
  name                = local.cosmosdb_account_name
  location            = azurerm_resource_group.env.location
  resource_group_name = azurerm_resource_group.env.name
  offer_type          = "Standard"
  kind                = "GlobalDocumentDB"

  enable_automatic_failover = true

  consistency_policy {
    consistency_level       = "BoundedStaleness"
    max_interval_in_seconds = 10
    max_staleness_prefix    = 200
  }

  geo_location {
    location          = azurerm_resource_group.env.location
    failover_priority = 0
  }

}

resource "azurerm_cosmosdb_sql_database" "default" {
  name                = var.cosmosDBdatabaseName
  resource_group_name = azurerm_cosmosdb_account.account.resource_group_name
  account_name        = azurerm_cosmosdb_account.account.name
}

resource "azurerm_cosmosdb_sql_container" "default" {
  name                = var.cosmosdb_sql_container
  resource_group_name = azurerm_cosmosdb_account.account.resource_group_name
  account_name        = azurerm_cosmosdb_account.account.name
  database_name       = azurerm_cosmosdb_sql_database.db.name
  partition_key_path  = "/id"
}

