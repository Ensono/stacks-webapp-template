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

output "redis_cache_key" {
  description = "Primary Key for accessing the RedisCache, should only be used in applications running outside of AzureCloud"
  sensitive   = true
  value       = var.create_cache ? azurerm_redis_cache.default.0.primary_access_key : ""
}

output "redis_cache_hostname" {
  description = "Primary Hostname endpoint for Redis Cache"
  sensitive   = false
  value       = var.create_cache ? azurerm_redis_cache.default.0.hostname : ""
}
