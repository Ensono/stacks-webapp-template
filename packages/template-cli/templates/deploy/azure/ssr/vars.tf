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

############################################
# AZURE INFORMATION
############################################

# RELYING PURELY ON ENVIRONMENT VARIABLES as the user can control these from their own environment

variable "client_secret" {
  type = string
}

variable "resource_group_location" {
  type    = string
  default = "uksouth"
  # default = "replace_azure_location"
}

variable "dns_zone" {
  type    = string
  default = "nonprod.amidostacks.com"
}

variable "create_dns_zone" {
  type    = bool
  default = true
}

variable "internal_dns_zone" {
  type    = string
  default = "nonprod.amidostacks.internal"
}
