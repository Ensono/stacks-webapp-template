############################################
# AUTHENTICATION
############################################
# RELYING PURELY ON ENVIRONMENT VARIABLES as the user can control these from their own environment
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
variable "create_rg" {
  type    = bool
  default = true
}



###########################
# IDENTITY SETTINGS
##########################
variable "create_aks_spn" {
  type    = bool
  default = true
}

variable "spn_url" {
  type    = string
  default = "https://stacks.azure.com/foo"
}

variable "spn_name" {
  type    = string
  default = "aksspn"
}

variable "spn_password" {
  type    = string
  default = "change12me"
}

variable "generate_password" {
  type    = bool
  default = true
}


###########################
# NETWORK SETTINGS
##########################

variable "create_aksvnet" {
  type    = bool
  default = true
}

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

variable "subnet_names" {
  type    = list(string)
  default = [""]
}

###########################
# DNS SETTINGS
##########################
variable "dns_zone" {
  type    = string
  default = ""
}

variable "create_dns_zone" {
  type    = bool
  default = true
}

variable "internal_dns_zone" {
  type    = string
  default = ""
}

###########################
# ACR SETTINGS
##########################
variable "create_acr" {
  type    = bool
  default = true
}

variable "acr_registry_name" {
  type    = string
  default = "myacrregistry"
}

variable "registry_admin_enabled" {
  type    = bool
  default = true
}

variable "registry_sku" {
  type    = string
  default = "Standard"

}

###########################
# AKS SETTINGS
##########################

variable "create_aks" {
  type    = bool
  default = true
}

variable "cluster_version" {
  type    = string
  default = "1.15.7"
}

variable cluster_name {
  default = "akscluster"
}

# variable "cluster_location" {
#   type    = string
#   default = "uksouth"
# }

variable "nodepool_type" {
  type    = string
  default = "VirtualMachineScaleSets"
}

variable "enable_auto_scaling" {
  type    = bool
  default = false
}

variable "max_pods" {
  type    = number
  default = 100
}

variable "max_nodes" {
  type    = number
  default = 10
}

variable "min_nodes" {
  type    = number
  default = 1
}

variable "node_count" {
  type    = number
  default = 0
}

# DEFAULTS TO 30 if not overwritten
variable "os_disk_size" {
  type    = number
  default = 30
}

variable "oms_ws_list_of_one" {
  type    = list(map(string))
  default = [{}]
}

# SPN values
variable "client_id" {
  type = string
}

variable "spn_object_id" {
  type = string
}

variable "client_secret" {
  type = string
}

variable "admin_username" {
  type    = string
  default = "ubuntu"
}

variable "create_ssh_key" {
  type    = bool
  default = true
}

variable "advanced_networking_enabled" {
  type    = bool
  default = true
}

variable "dns_prefix" {
  type    = string
  default = "aks"

}

variable "vm_size" {
  type    = string
  default = "Standard_DS2_v2"

}

# nodepool_type # "VirtualMachineScaleSets" # default
#     enable_auto_scaling = true
#     max_count           = var.max_nodes
#     min_count           = var.min_nodes
#     name                = "default"
#     os_disk_size_gb     = var.os_disk_size
#     vm_size             = var.agent_size
#     vnet_subnet_id      = var.vnet_subnet_id


###########################
# MISC SETTINGS
##########################

variable "resource_namer" {
  type    = string
  default = "genericname"
}

variable "retention_in_days" {
  type    = number
  default = 30
}

variable "log_application_type" {
  type    = string
  default = "other"
}
