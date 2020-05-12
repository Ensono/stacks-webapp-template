# NB: GCP creates a registry automagically upon pushing the first image into it
# # TODO: allow location override

# resource "google_container_registry" "default" {
#   provider = google-beta
#   project  = "${var.resource_namer}-registry"
#   location = "EU"
# }

# resource "google_storage_bucket" "default_gcr" {
#   name          = "${var.resource_namer}-registry"
#   location      = "EU"
#   force_destroy = true
#   labels        = var.tags
# }
