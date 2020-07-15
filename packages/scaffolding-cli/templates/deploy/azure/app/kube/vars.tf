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

variable "resource_group_location" {
  type    = string
  default = "uksouth"
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

variable "dns_zone_resource_group" {
  type    = string
  default = ""
}

variable "core_resource_group" {
  type    = string
}

variable "internal_dns_zone_name" {
  type    = string
  default = "nonprod.amidostacks.internal"
}


###########################
# CONDITIONAL SETTINGS
##########################
variable "create_cosmosdb" {
  description = "Whether to create a cosmosdb or not for this application"
  type    = bool
  default = true
}

variable "create_cache" {
  type = bool
  description = "Whether to create a RedisCache"
  default = false
}

variable "create_dns_record" {
  type = bool
  default = false
}

variable "create_cdn_endpoint" {
  type = bool
  default = false
}

####################
# RedisCache Options
####################

variable "cache_capacity" {
  type = number
  default = 2
  description = "Specify desired capacity"
}

variable "cache_family" {
  type = string
  default = "C"
  description = "Specify desired compute family"
}

variable "cache_sku_name" {
  type = string
  default = "Standard"
  description = "Specify desired sku_name"
}

variable "cach_enable_non_ssl_port" {
  type = bool
  default = false
  description = "Enable non SSL port"
}

variable "cache_minimum_tls_version" {
  type = string
  default = "1.2"
  description = "Specify minimum TLS version"
}

variable "cache_redis_enable_authentication" {
  type = bool
  default = true
  description = "Enabale authentication. This highly recommended for any public facing clusters"
}

variable "cache_redis_maxmemory_reserved" {
  type = number
  default = 2
  description = "Specify max reserved memory"
}

variable "cache_redis_maxmemory_delta" {
  type = number
  default = 2
  description = "Specify max memory delta"
}

variable "cache_redis_maxmemory_policy" {
  type = string
  default = "allkeys-lru"
  description = "Specify max memory policy"
}

####################
# CDN Options
####################

variable "cdn_profile_name" {
  type = string
  description = ""
}

########################
# CDN Response Headers #
########################
variable "response_header_cdn" {
  type = list(map(string))
  description = "Custom Response Headers for Microsoft CDN. Can be used with security and auditing requirements"
  default = [
    {
      action = "Append"
      name = "Content-Security-Policy"
      value = "default-src * 'unsafe-inline' 'unsafe-eval'"
    }
  ]
}
