# ---------------------------------------------------------------------------------------------------------------------
# PREPARE PROVIDERS
# ---------------------------------------------------------------------------------------------------------------------
terraform {
  backend "gcs" {
  }
}

provider "google" {
  version = "~> 3.20.0"
  project = var.project
  region  = var.region
}

provider "google-beta" {
  version = "~> 3.20.0"
  project = var.project
  region  = var.region
}
