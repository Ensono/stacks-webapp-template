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

module "gke-public" {
  # source         = "../../"
  source         = "git::https://github.com/amido/stacks-webapp-template//libs/orchestration/terraform-gcp-amido-gke?ref=feat/1801"
  stage          = var.stage
  location       = var.location
  project        = var.project
  region         = var.region
  resource_namer = module.default_label.id
  tags           = module.default_label.tags
  dns_zone       = var.dns_zone
  cluster_version = var.cluster_version
  enable_legacy_abac = false
}

# // Get available master versions in our location to determine the latest version
# data "google_container_engine_versions" "location" {
#   location = var.location
#   project  = var.project
# }

