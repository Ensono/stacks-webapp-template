resource "google_dns_managed_zone" "default" {

  provider = google-beta
  count    = var.create_dns_zone ? 1 : 0
  name     = var.resource_namer
  dns_name = "${var.dns_zone}."
  description = "Zone for ${var.stage}"
  # labels = merge(var.tags, map("ManagedBy", "Amido"))
}

resource "google_compute_managed_ssl_certificate" "default" {
  provider = google-beta

  name = var.resource_namer
  type = "MANAGED"
  managed {
    domains = ["*.${var.dns_zone}."]
  }
}

resource "google_compute_target_https_proxy" "default" {
  provider = google-beta

  name             = var.resource_namer
  url_map          = google_compute_url_map.default.self_link
  ssl_certificates = [google_compute_managed_ssl_certificate.default.self_link]
}

resource "google_compute_url_map" "default" {
  provider = google-beta

  name        = var.resource_namer
  description = "a description"

  default_service = google_compute_backend_service.default.self_link

  host_rule {
    hosts        = [var.dns_zone]
    path_matcher = "allpaths"
  }

  path_matcher {
    name            = "allpaths"
    default_service = google_compute_backend_service.default.self_link

    path_rule {
      paths   = ["/*"]
      service = google_compute_backend_service.default.self_link
    }
  }
}

resource "google_compute_backend_service" "default" {
  provider = google-beta

  name        = var.resource_namer
  port_name   = "http"
  protocol    = "HTTP"
  timeout_sec = 10

  health_checks = [google_compute_http_health_check.default.self_link]
}

resource "google_compute_http_health_check" "default" {
  provider = google-beta

  name               = "http-health-check"
  request_path       = "/"
  check_interval_sec = 1
  timeout_sec        = 1
}

resource "google_compute_global_forwarding_rule" "default" {
  provider = google-beta

  name       = var.resource_namer
  target     = google_compute_target_https_proxy.default.self_link
  port_range = 443
}
