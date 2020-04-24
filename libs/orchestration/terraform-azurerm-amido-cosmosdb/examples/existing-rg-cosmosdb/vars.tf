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
  default = "stacks"

}

variable "name_component" {
  type    = string
  default = "api"
}

variable "name_environment" {
  type    = string
  default = "api"
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

############################################
# AZURE INFORMATION
############################################


############################################
# RESOURCE INFORMATION
############################################
variable "resource_group_location" {
  type    = string
  default = "uksouth"
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

# ###########################
# # DNS SETTINGS
# ##########################
variable "dns_zone" {
  type    = string
  default = "nonprod.amidostacks.com"
}

variable "internal_dns_zone" {
  type    = string
  default = "nonprod.amidostacks.internal"
}

variable "pfx_password" {
  type    = string
  default = "Password1"
}


# ###########################
# # CONDITIONALS
# ##########################
variable "create_dns_zone" {
  type    = bool
  default = true
}

variable "create_aksvnet" {
  type    = bool
  default = true
}

variable "create_user_identiy" {
  type    = bool
  default = true
}
