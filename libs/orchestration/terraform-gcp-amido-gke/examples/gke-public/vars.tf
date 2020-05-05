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
