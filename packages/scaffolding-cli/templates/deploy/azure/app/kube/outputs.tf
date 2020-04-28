output "cosmosdb_database_name" {
  description = "CosmosDB Database name"
  value       = module.cosmosdb.cosmosdb_database_name
}

output "cosmosdb_account_name" {
  description = "CosmosDB account name"
  value       = module.cosmosdb.cosmosdb_account_name
}

output "cosmosdb_endpoint" {
  description = "Endpoint for accessing the DB CRUD"
  value       = module.cosmosdb.cosmosdb_endpoint
}

output "cosmosdb_primary_master_key" {
  description = "Primary Key for accessing the DB CRUD, should only be used in applications running outside of AzureCloud"
  sensitive   = true
  value       = module.cosmosdb.cosmosdb_primary_master_key
}
