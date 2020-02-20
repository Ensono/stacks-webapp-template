############################################
# AUTHENTICATION
############################################
# RELYING PURELY ON ENVIRONMENT VARIABLES as the user can control these from their own environment
############################################
# NAMING
############################################

variable "name_company" {
  type    = string
  default = "amido"
}

variable "name_project" {
  type    = string
  default = "stacks-node"

}

variable "name_component" {
  type    = string
  default = "infra"
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

# RELYING PURELY ON ENVIRONMENT VARIABLES as the user can control these from their own environment

variable "client_secret" {
  type = string
}

############################################
# RESOURCE INFORMATION
############################################

# variable "resource_location" {
#   default = "uksouth"
# }

# variable "resource_tags" {
#   type = map(string)
#   default = {}
# }

# variable "resource_group_name" {
#   type = string
# }

# ###########################
# # CONDITIONAL SETTINGS
# ##########################
# variable "create_rg" {
#   type = bool
#   default = true
# }

# variable "create_aksvnet" {
#   type = bool
#   default = true
# }

# ###########################
# # IDENTITY SETTINGS
# ##########################
# variable "spn_url" {
#   type = string
#   default = "https://portal.azure.com"
# }

