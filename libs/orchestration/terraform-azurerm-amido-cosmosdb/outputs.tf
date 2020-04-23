output "cosmosdb_database_name" {
  value = azurerm_cosmosdb_sql_database.default.name
}
output "cosmosdb_account_name" {
  value = azurerm_cosmosdb_sql_database.default.account_name
}

output "cosmosdb_endpoint" {
  description = "Endpoint for accessing the DB CRUD"
  value = var.create_cosmosdb ? azurerm_cosmosdb_account.default.0.endpoint : ""
}

output "cosmosdb_primary_master_key" {
  description = "Primary Key for accessing the DB CRUD"
  sensitive = true
  value = var.create_cosmosdb ? azurerm_cosmosdb_sql_database.default.0.primary_master_key : ""
}
