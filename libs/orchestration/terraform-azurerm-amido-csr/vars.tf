############################################
# AUTHENTICATION
############################################
variable "subscription_id" {}
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

###########################
# DNS
########################### 

variable "create_dns_zone" {
  type        = bool
  description = "Creates a DNS zone, else uses a supplied one to add records to"
}

variable "dns_zone" {
  type        = string
  description = "DNS Zone value"
}

variable "dns_record" {
  type        = string
  description = "DNS Record value"
}

variable "dns_resource_group" {
  type = string 
  description = "RG for the DNS Zone if adding to an existing one"
  default = "amido-nonprod-dns"
}


############################################
# RESOURCE INFORMATION
############################################

variable "resource_group_location" {
  default = "uksouth"
}

variable "resource_tags" {
  type    = map(string)
  default = {}
}

variable "resource_namer" {
  type = string
}


###########################
# SinglePageApplication
##########################

variable "index_doc" {
  type        = string
  default     = "index.html"
  description = "Represents the name of the index document. This is commonly \"index.html\"."
}

variable "error_doc" {
  type        = string
  default     = ""
  description = "Represents the path to the error document that should be shown when an error 404 is issued, in other words, when a browser requests a page that does not exist."
}

variable "enabled" {
  type        = bool
  default     = true
  description = "Enables or disables the static-website"
}

variable "account_replication_type" {
  type    = string
  default = "LRS"
}

variable "account_kind" {
  type    = string
  default = "StorageV2"
}

variable "account_tier" {
  type    = string
  default = "Standard"
}

########################
# CDN Response Headers #
########################
variable "response_header_cdn" {
  type = list(map(string))
  default = [
    {
      action = "Append" # - (Required) Action to be executed on a header value. Valid values are Append, Delete and Overwrite.
      name = "Content-Security-Policy" # - (Required) The header name.
      value = "default-src * 'unsafe-inline' 'unsafe-eval'" 
    }
  ]
}
