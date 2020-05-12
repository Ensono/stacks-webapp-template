resource "google_dns_managed_zone" "default" {

  provider = google-beta
  count    = var.create_dns_zone ? 1 : 0
  name     = var.resource_namer
  dns_name = "${var.dns_zone}."
  description = "Zone for ${var.stage}"
  # labels = merge(var.tags, map("ManagedBy", "Amido"))
}
