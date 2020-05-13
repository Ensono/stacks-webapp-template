output "cluster_name" {
  # This may seem redundant with the `name` input, but it serves an important
  # purpose. Terraform won't establish a dependency graph without this to interpolate on.
  description = "The name of the cluster master. This output is used for interpolation with node pools, other modules."
  value = module.gke_cluster.name
}

output "master_version" {
  description = "The Kubernetes master version."
  value       = module.gke_cluster.master_version
}

output "cluster_endpoint" {
  description = "The IP address of the cluster master."
  sensitive   = true
  value       = module.gke_cluster.endpoint
}

output "client_certificate" {
  description = "Public certificate used by clients to authenticate to the cluster endpoint."
  value       = module.gke_cluster.client_certificate
}

output "client_key" {
  description = "Private key used by clients to authenticate to the cluster endpoint."
  sensitive   = true
  value       = module.gke_cluster.client_key
}

output "cluster_ca_certificate" {
  description = "The public certificate that is the root of trust for the cluster."
  sensitive   = true
  value       = module.gke_cluster.cluster_ca_certificate
}

output "gke_ingress_public_ip" {
  description = "Public IP to be used for the ingress controller inside the cluster"
  value       = google_compute_address.public.address
}

output "gke_ingress_public_ip_name" {
  description = "Public IP name to be used for the ingress controller inside the cluster"
  value       = google_compute_address.public.name
}
# output "gke_ingress_private_ip" {
#   description = "Private IP to be used for the ingress controller inside the cluster"
#   value       = google_compute_global_address.private.address
# }
