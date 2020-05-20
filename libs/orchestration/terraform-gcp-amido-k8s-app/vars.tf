# ---------------------------------------------------------------------------------------------------------------------
# REQUIRED PARAMETERS
# These variables are expected to be passed in by the operator.
# ---------------------------------------------------------------------------------------------------------------------

variable "project" {
  description = "The project ID where all resources will be launched."
  type        = string
}

variable "location" {
  description = "The location (region or zone) of the GKE cluster."
  type        = string
}

variable "region" {
  description = "The region for the network. If the cluster is regional, this must be the same region. Otherwise, it should be the region of the zone."
  type        = string
}

variable "resource_namer" {
  description = "Unified resource namer value"
  type        = string
}

# ---------------------------------------------------------------------------------------------------------------------
# BUSINESS PARAMETERS
# These parameters have reasonable defaults.
# ---------------------------------------------------------------------------------------------------------------------

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
  default = "gke-infra"
}

variable "name_environment" {
  type    = string
  default = "nonprod"
}

# ---------------------------------------------------------------------------------------------------------------------
# OPTIONAL PARAMETERS
# These parameters have reasonable defaults.
# ---------------------------------------------------------------------------------------------------------------------


# --------
# Stacks Additions
#
# -----------

variable "stage" {
  description = "Stage of depployment - usually set by a workspace name or passed in specifically from caller"
  type        = string
  default     = "nonprod"
}

variable "tags" {
  description = "Tags used for uniform resource tagging"
  type        = map(string)
  default     = {}
}

# variable "dns_zone" {
#   description = "DNS zone object"
#   type        = map(string)
# }
variable "dns_zone" {
  description = "DNS zone object"
  type        = object({name = string, project = string, dns_name = string, description =string, name_servers = list(string), visibility = string})
}

variable "dns_record" {
  type    = string
  default = "app"
}

variable "load_balancer_ip" {
  description = "IP of the load balancer to apply for the dns record"
  type = string  
}

