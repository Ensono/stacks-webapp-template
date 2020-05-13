resource "google_dns_managed_zone" "default" {

  provider    = google-beta
  count       = var.create_dns_zone ? 1 : 0
  name        = var.resource_namer
  dns_name    = "${var.dns_zone}."
  description = "Zone for ${var.stage}"
  # Re-enable tags once issue fixed
  labels = merge(var.tags, map("managed_by", var.name_company))
}

resource "google_compute_global_address" "public" {
  provider     = google-beta
  name         = "${var.resource_namer}-public"
  ip_version   = "IPV4"
  address_type = "EXTERNAL"
  labels       = merge(var.tags, map("ingress", "public"))
}


data "google_compute_global_address" "public" {
  name       = "${var.resource_namer}-public"
  depends_on = [google_compute_global_address.public]
}

# INTERNAL IPs - TODO: management of 
# resource "google_compute_global_address" "private" {
#   provider     = google-beta
#   name         = "${var.resource_namer}-private"
#   ip_version   = "IPV4"
#   address_type = "INTERNAL"
#   network      = module.vpc_network.network
#   labels       = merge(var.tags, map("ingress", "private"))
# }

# data "google_compute_global_address" "private" {
#   name       = "${var.resource_namer}-private"
#   depends_on = [google_compute_global_address.private]
# }
