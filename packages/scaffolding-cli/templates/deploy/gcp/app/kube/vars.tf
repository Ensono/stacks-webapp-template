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
  default = "node-app"
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

variable "dns_zone_name" {
  type    = string
  default = "amido-stacks-nonprod-gke-infra"
}

variable "dns_record" {
  type    = string
  default = "app"
}

variable "ingress_ip_name" {
  description = "IP name of the load balancer to apply for the dns record"
  type = string
  default = "amido-stacks-nonprod-gke-infra-ingress-public"
}
