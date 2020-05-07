# ---------------------------------------------------------------------------------------------------------------------
# PREPARE PROVIDERS
# ---------------------------------------------------------------------------------------------------------------------

provider "google" {
  version = "~> 2.9.0"
  project = var.project
  region  = var.region
}

provider "google-beta" {
  version = "~> 2.9.0"
  project = var.project
  region  = var.region
}
