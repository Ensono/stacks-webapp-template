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

# variable "resource_group_tags" {
#   type    = map(string)
#   default = {}
# }

# variable "resource_group_name" {
#   type = string
# }

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
