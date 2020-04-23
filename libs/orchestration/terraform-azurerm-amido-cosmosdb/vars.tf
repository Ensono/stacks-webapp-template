############################################
# AUTHENTICATION
############################################
############################################
# NAMING
############################################

variable "name_company" {
}

variable "name_environment" {
}

variable "name_platform" {
}

variable "name_component" {
  
}


############################################
# RESOURCE GROUP INFORMATION
############################################

variable "resource_group_location_env" {
  default = "uksouth"
}

variable "resource_group_tags" {
  type = map(string)
  default = {}
}

############################################
# COSMOSDB INFORMATION
############################################

variable "cosmosdb_database_name" {
  description = "CosmosDB account name"
  type = string
}

variable "cosmosdb_sql_container" {
  description = "Sql container name"
  type = string  
}

variable "cosmosdb_sql_container_partition_key" {
  description = "Partition key path, if multiple partition"
  
}

cosmosdb_sql_container
###########################

# locals {
#   cosmosdb_account_name            = "${var.name_company}${var.name_platform}${var.name_component}cda${var.location_name_map[var.resource_group_location_env]}${var.name_environment}"
#   cosmosdb_table_name             = "${var.name_company}${var.name_platform}${var.name_component}cdt${var.location_name_map[var.resource_group_location_env]}${var.name_environment}"
#   cosmosdb_db_name             = "${var.name_company}${var.name_platform}${var.name_component}cdb${var.location_name_map[var.resource_group_location_env]}${var.name_environment}"
#   resource_group_name_env      = "${var.name_company}-${var.name_platform}-${var.name_component}-rg-${var.location_name_map[var.resource_group_location_env]}-${var.name_environment}"
# }

