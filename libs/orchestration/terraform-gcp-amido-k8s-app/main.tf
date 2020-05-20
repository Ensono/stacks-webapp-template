resource "google_dns_record_set" "default" {
  provider = google-beta
  name = "${var.dns_record}.${lookup(var.dns_zone, "dns_name")}"
  type = "A"
  ttl  = 300
  managed_zone = lookup(var.dns_zone, "name")
  rrdatas = [var.load_balancer_ip]
}
