############################################
# AUTHENTICATION
############################################
# RELYING PURELY ON ENVIRONMENT VARIABLES as the user can control these from their own environment
############################################
# NAMING
############################################

variable "name_company" {
  description = "Company Name - should/will be used in conventional resource naming"
  type = string
}

variable "name_project" {
  description = "Project Name - should/will be used in conventional resource naming"
  type = string
}

variable "name_component" {
  description = "Component Name - should/will be used in conventional resource naming. Typically this will be a logical name for this part of the system i.e. `API` || `middleware` or more generic like `Billing`"
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
  description = "Additional attributes for tagging"
  default = []
}

variable "tags" {
  description = "Tags to be assigned to all resources, NB if global tagging is enabled these will get overwritten periodically"
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
  description = "Location of the RG"
  type    = string
  default = "uksouth"
}

variable "resource_group_tags" {
  description = "Tags at a RG level"
  type    = map(string)
  default = {}
}


###########################
# IDENTITY SETTINGS
##########################
variable "create_user_identiy" {
  description = "Creates a User Managed Identity - which can be used subsquently with AAD pod identity extensions"
  type    = bool
  default = true
}

###########################
# NETWORK SETTINGS
##########################

variable "create_aksvnet" {
  description = "Whether to create an AKS VNET specifically or use an existing one - if false you must supply an existing VNET name and a vnet_cidr for subnets"
  type    = bool
  default = true
}

variable "vnet_name" {
  description = "VNET name if create_aks_vnet is false"
  type    = string
  default = "changeme"
}

variable "vnet_cidr" {
  description = "CIDR block notation for VNET"
  type = list(string)
}

variable "subnet_prefixes" {
  description = "Prefix for subnet - should be in the form of x.x.x.x/x"
  type    = list(string)
  default = [""]
}

variable "subnet_front_end_prefix" {
  description = "Prefix for front end subnet - should be in the form of x.x.x.x/x"
  type = string
}

variable "subnet_names" {
  description = "Names for subnets"
  type    = list(string)
  default = [""]
}

###########################
# DNS SETTINGS
##########################
variable "dns_zone" {
  description = "Dns zone name - e.g. nonprod.domain.com, you should avoid using an APEX zone"
  type    = string
  default = ""
}

variable "create_dns_zone" {
  description = "whether to create a DNS zone"
  type    = bool
  default = true
}

variable "internal_dns_zone" {
  description = "Internal DNS zone name - e.g. nonprod.domain.internal"
  type    = string
  default = ""
}

###########################
# ACR SETTINGS
##########################
variable "create_acr" {
  description = "whether to create a ACR"
  type    = bool
  default = true
}

variable "acr_registry_name" {
  description = "ACR name"
  type    = string
  default = "myacrregistry"
}

variable "registry_admin_enabled" {
  description = "Whether ACR admin is enabled"
  type    = bool
  default = true
}

variable "registry_sku" {
  description = "ACR SKU"
  type    = string
  default = "Standard"

}

###########################
# AKS SETTINGS
##########################

variable "create_aks" {
  description = "Whether KAS gets created"
  type    = bool
  default = true
}

variable "cluster_version" {
  description = "Specify AKS cluster version - please refer to MS for latest updates on the available versions. NB: opt for stable versions where possible"
  type    = string
  default = "1.15.7"
}

variable cluster_name {
  description = "Name for the cluster"
  default = "akscluster"
}

variable "tenant_id" {
  type = string
}

variable "spn_object_id" {
  type = string
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

variable "aks_ingress_private_ip" {
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

###########################
# MISC SETTINGS
##########################
variable "resource_namer" {
  description = "This should be a uniformly created string - ideally using something like cloudposse label module to ensure conventions on naming are followed throughout organization. this value is used in all the places within the module to name resources - additionally it changes the string to ensure it conforms to Azure standards where appropriate - i.e. blob/KV/ACR names are stripped of non alphanumeric characters and in some cases strings are sliced to conform to max char length"
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
