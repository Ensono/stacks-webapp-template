############################################
# AUTHENTICATION
############################################
############################################
# NAMING
############################################

variable "name_company" {
}

variable "name_project" {
}

variable "name_component" {
}

variable "name_environment" {
}

# Each region must have corresponding a shortend name for resource naming purposes 
variable "location_name_map" {
  type = map(string)

  default = {
    northeurope   = "eun"
    westeurope    = "euw"
    uksouth       = "uks"
    ukwest        = "ukw"
    eastus        = "use"
    eastus2       = "use2"
    westus        = "usw"
    eastasia      = "ase"
    southeastasia = "asse"
  }
}

############################################
# AZURE INFORMATION
############################################
variable "subscription_id" {
  type = string
}


############################################
# RESOURCE INFORMATION
############################################

variable "resource_location" {
  default = "uksouth"
}

variable "resource_tags" {
  type = map(string)
  default = {}
}

###########################

locals {
  # // common //
  resource_prefix           = "${var.name_company}-${var.name_project}-${var.name_component}"
  resource_suffix           = "${var.location_name_map[var.resource_location]}-${var.name_environment}"
  
  # // resource group //
  resource_group_name       = "${local.resource_prefix}-rg-${local.resource_suffix}"

  # // storage account - static website hosting //
  storage_account_name      = "${var.name_company}${var.name_project}${var.name_component}sa${var.location_name_map[var.resource_location]}${var.name_environment}"
}

