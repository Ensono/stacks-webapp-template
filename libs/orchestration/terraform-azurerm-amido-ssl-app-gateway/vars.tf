############################################
# AUTHENTICATION
############################################
# RELYING PURELY ON ENVIRONMENT VARIABLES as the user can control these from their own environment
############################################
# NAMING
############################################

# variable "name_company" {
#   type = string
# }

# variable "name_project" {
#   type = string
# }

# variable "name_component" {
#   type = string
# }

# variable "name_environment" {
#   type = string
# }

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

############################################
# RESOURCE INFORMATION
############################################

variable "resource_group_location" {
  type    = string
  default = "uksouth"
}

variable "resource_group_tags" {
  type    = map(string)
  default = {}
}

variable "resource_group_name" {
  type = string
}

###########################
# CONDITIONAL SETTINGS
##########################
variable "create_ssl_cert" {
  type    = bool
  default = true
}



# ###########################
# # IDENTITY SETTINGS
# ##########################
# variable "create_aks_spn" {
#   type    = bool
#   default = true
# }

# variable "spn_url" {
#   type    = string
#   default = "https://stacks.azure.com/foo"
# }

# variable "spn_name" {
#   type    = string
#   default = "aksspn"
# }

# variable "spn_password" {
#   type    = string
#   default = "change12me"
# }

# variable "generate_password" {
#   type    = bool
#   default = true
# }


# ###########################
# # NETWORK SETTINGS
# ##########################

# variable "create_aksvnet" {
#   type    = bool
#   default = true
# }

variable "vnet_name" {
  type    = string
  default = "changeme"
}

variable "vnet_cidr" {
  type = list(string)
}

variable "subnet_prefixes" {
  type    = list(string)
  default = [""]
}

variable "subnet_front_end_prefix" {
  type = string
}

variable "subnet_backend_end_prefix" {
  type = string
}

variable "subnet_names" {
  type    = list(string)
  default = [""]
}

# ###########################
# # DNS SETTINGS
# ##########################
variable "dns_zone" {
  type    = string
  default = ""
}

variable "aks_ingress_private_ip" {
  type = string
}

variable "aks_ingress_public_ip" {
  type = string
}


# variable "create_dns_zone" {
#   type    = bool
#   default = true
# }

# variable "internal_dns_zone" {
#   type    = string
#   default = ""
# }

# ###########################
# # ACR SETTINGS
# ##########################
# variable "create_acr" {
#   type    = bool
#   default = true
# }

# variable "acr_registry_name" {
#   type    = string
#   default = "myacrregistry"
# }

# variable "registry_admin_enabled" {
#   type    = bool
#   default = true
# }

# variable "registry_sku" {
#   type    = string
#   default = "Standard"

# }

# ###########################
# # AKS SETTINGS
# ##########################

variable "aks_resource_group" {
  type    = string
}

###########################
# MISC SETTINGS
##########################

variable "resource_namer" {
  type    = string
  default = "genericname"
}

variable "pfx_password" {
  type = string
  default = "Password1"
}
