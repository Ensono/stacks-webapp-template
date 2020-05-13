output "cluster_endpoint" {
  description = "The IP address of the cluster master."
  sensitive   = true
  value       = module.gke-public.cluster_endpoint
}

output "client_certificate" {
  description = "Public certificate used by clients to authenticate to the cluster endpoint."
  value       = module.gke-public.client_certificate
}

output "client_key" {
  description = "Private key used by clients to authenticate to the cluster endpoint."
  sensitive   = true
  value       = module.gke-public.client_key
}

output "cluster_ca_certificate" {
  description = "The public certificate that is the root of trust for the cluster."
  sensitive   = true
  value       = module.gke-public.cluster_ca_certificate
}

output "gke_ingress_public_ip" {
  description = "Public IP to be used for the ingress controller inside the cluster"
  value       = module.gke-public.gke_ingress_public_ip
}

# output "gke_ingress_private_ip" {
#   description = "Public IP to be used for the ingress controller inside the cluster"
#   value       = module.gke-public.gke_ingress_private_ip
# }
