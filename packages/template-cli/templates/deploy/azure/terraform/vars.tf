############################################
# AUTHENTICATION
############################################
# RELAYING PURELY ON ENVIRONMENT VARIABLES as the user can control these from their own environment
############################################
# NAMING
############################################

variable "name_company" {
  type = string
}

variable "name_project" {
  type = string
}

variable "name_component" {
  type = string
}

variable "name_environment" {
  type = string
}

variable "stage" {
  type = string
  default = "dev"
}

variable "attributes" {
  default = []
}

variable "tags" {
  type    = map(string)
  default = {}
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

variable "rg_name" {
  type = string
}

###########################
# SPA
##########################

variable "index_document" {
  type        = string
  default     = "index.html"
  description = "Represents the name of the index document. This is commonly \"index.html\"."
}

variable "notfound_document" {
  type        = string
  default     = "404.html"
  description = "Represents the path to the error document that should be shown when an error 404 is issued, in other words, when a browser requests a page that does not exist."
}

variable "enabled" {
  type        = bool
  default     = true
  description = "Enables or disables the static-website"
}


# locals {
#   # // common //
#   resource_prefix           = "${var.name_company}-${var.name_project}-${var.name_component}"
#   resource_suffix           = "${var.location_name_map[var.resource_location]}-${var.name_environment}"

#   # // resource group //
#   resource_group_name       = "${local.resource_prefix}-rg-${local.resource_suffix}"

#   # // storage account - static website hosting //
#   storage_account_name      = "${var.name_company}${var.name_project}${var.name_component}sa${var.location_name_map[var.resource_location]}${var.name_environment}"
# }
