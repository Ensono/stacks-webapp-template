
###################################################################
# This is hardcoded because it does not change between environments
# This is tied to the application structure and shouldn't change
###################################################################

resource "azurerm_cosmosdb_sql_container" "default" {
  name                = var.cosmosdb_sql_container
  resource_group_name = azurerm_cosmosdb_account.account.resource_group_name
  account_name        = azurerm_cosmosdb_account.account.name
  database_name       = azurerm_cosmosdb_sql_database.db.name
  partition_key_path  = "/id"
}
