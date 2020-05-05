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
  source         = "../../"
  stage          = var.stage
  location       = var.location
  project        = var.project
  region         = var.region
  resource_namer = module.default_label.id
  tags           = module.default_label.tags
  dns_zone       = "gke.nonprod.amidostacks.com."
}
