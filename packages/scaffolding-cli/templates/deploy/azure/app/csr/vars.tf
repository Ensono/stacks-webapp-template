############################################
# AUTHENTICATION
############################################
# RELYING PURELY ON ENVIRONMENT VARIABLES as the user can control these from their own environment
############################################
# NAMING
############################################

variable "name_company" {
  type    = string
  default = "replace_company_name"
}

variable "name_project" {
  type    = string
  default = "replace_project_name"

}

variable "name_component" {
  type    = string
  default = "replace_component_name"
}

variable "stage" {
  type    = string
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

variable "resource_group_location" {
  type    = string
  default = "uksouth"
}

variable "resource_group_name" {
  description = "RG name of where you want to be deploying app level resources, can be left blank and "
  type = string   
}

variable "app_gateway_frontend_ip_name" {
  description = ""
  type = string  
}

variable "dns_record" {
  description = ""
  type = string
  default = "app" 
}


variable "dns_zone_name" {
  type    = string
  default = "nonprod.amidostacks.com"
}

variable "internal_dns_zone_name" {
  type    = string
  default = "nonprod.amidostacks.internal"
}

###########################
# CONDITIONAL SETTINGS
##########################
variable "create_cosmosdb" {
  description = "Whether to create a cosmosdb or not for this application"
  type    = bool
  default = true
}

variable "use_existing_resource_group" {
  description = "Whether to create a resource group for application level resources, if set to true and `resource_group_name` is not specified it will create a resource group for you. Ensure you specify resource group when setting to true"
  type    = bool
  default = true
}
