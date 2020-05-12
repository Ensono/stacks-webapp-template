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

variable "stage" {
  type    = string
  default = "nonprod"
}

variable "attributes" {
  default = []
}

variable "tags" {
  type    = map(string)
  default = {}
}

variable "project" {
  type    = string
  default = "amido-stacks"
}

variable "region" {
  type    = string
  default = "europe-west2"
}

variable "location" {
  type    = string
  default = "europe-west2"
}

variable "dns_zone" {
  type = string
  default = "gke.nonprod.amidostacks.com"  
}

variable "enable_legacy_abac" { 
  description = "Whether or not to enable legacy ABAC"
  type = bool
  default = false
}

variable "cluster_version" {
  type = string
  default = "1.15.11-gke.12"
}
