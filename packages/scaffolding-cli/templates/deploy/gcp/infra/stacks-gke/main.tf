# Naming convention 
module "default_label" {
  source     = "git::https://github.com/cloudposse/terraform-null-label.git?ref=0.16.0"
  namespace  = format("%s-%s", var.name_company, var.name_project)
  stage      = var.stage
  name       = var.name_component
  attributes = var.attributes
  delimiter  = "-"
  tags       = var.tags
}

data "google_client_config" "current" {}

module "gke-public" {
  source         = "git::https://github.com/amido/stacks-webapp-template//libs/orchestration/terraform-gcp-amido-gke?ref=master"
  stage              = var.stage
  name_project       = var.name_project
  name_company       = var.name_company
  name_component     = var.name_component
  location           = var.location
  project            = var.project
  region             = var.region
  resource_namer     = module.default_label.id
  # GCP only accepts lower cased k/v maps
  tags               = tomap(jsondecode(lower(tostring(jsonencode(module.default_label.tags)))))
  dns_zone           = var.dns_zone
  cluster_version    = var.cluster_version
  enable_legacy_abac = false
}

