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

data "google_dns_managed_zone" "default" {
  name = var.dns_zone_name
}

data "google_compute_global_address" "default" {
  name       = var.ingress_ip_name
}

module "node_app" {
  source             = "../../"
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
  dns_zone           = data.google_dns_managed_zone.default
  dns_record         = var.dns_record
  load_balancer_ip   = data.google_compute_global_address.default.address
}

# // Get available master versions in our location to determine the latest version
# data "google_container_engine_versions" "location" {
#   location = var.location
#   project  = var.project
# }

