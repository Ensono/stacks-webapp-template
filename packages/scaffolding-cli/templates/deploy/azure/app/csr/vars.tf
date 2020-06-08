############################################
# AUTHENTICATION
############################################
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


###########################
# SinglePageApplication
##########################

variable "index_document" {
  type        = string
  default     = "index.html"
  description = "Represents the name of the index document. This is commonly \"index.html\"."
}

variable "notfound_document" {
  type        = string
  default     = "404.html"
  description = "Represents the path to the error document that should be shown when an error 404 is issued, in other words, when a browser requests a page that does not exist."
}

variable "enabled" {
  type        = bool
  default     = true
  description = "Enables or disables the static-website"
}

###########################
# DNS
########################### 

variable "create_dns_zone" {
  type        = bool
  description = "Creates a DNS zone, else uses a supplied one to add records to"
  default     = false
}

variable "dns_zone" {
  type        = string
  description = "DNS Zone value"
  # default = "nonprod.amidostacks.com"
}

variable "dns_record" {
  type        = string
  description = "DNS Record value"
  default     = "csr-app-dn"
}

variable "dns_resource_group" {
  type = string 
  description = "RG for the DNS Zone if adding to an existing one"
  default = "amido-nonprod-dns"
}
