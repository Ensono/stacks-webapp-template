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

variable "name_environment" {
  type    = string
  default = "nonprod"
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

variable "client_secret" {
  type = string
}

variable "resource_group_location" {
  type    = string
  default = "uksouth"
}

variable "dns_zone" {
  type    = string
  default = "nonprod.amidostacks.com"
}

variable "internal_dns_zone" {
  type    = string
  default = "nonprod.amidostacks.internal"
}

variable "pfx_password" {
  type = string
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

variable "cluster_version" {
  type = string
  default = "1.16.7"
}

variable "create_acr" {
  type = bool
  default = false
}

variable "acr_resource_group" {
  type = string
  default = ""
}

variable "is_cluster_private" {
  type        = bool
  description = "Set cluster private - API only accessible over internal network"
  default     = false
}

variable "log_application_type" {
  type    = string
  default = "other"
}

variable key_vault_name {
  description = "Key Vault name - if not specificied will default to computed naming convention"
  type = string
  default = ""
}
