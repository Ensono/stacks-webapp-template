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

variable "resource_group_location" {
  type    = string
  default = "uksouth"
}

variable "resource_group_name" {
  description = "RG name of where you want to deploying addition app level resources"
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
