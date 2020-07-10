output "cluster_name" {
  # This may seem redundant with the `name` input, but it serves an important
  # purpose. Terraform won't establish a dependency graph without this to interpolate on.
  description = "The name of the cluster master. This output is used for interpolation with node pools, other modules."
  value       = module.gke_cluster.cluster_name
}

output "master_version" {
  description = "The Kubernetes master version."
  value       = module.gke_cluster.master_version
}

output "cluster_endpoint" {
  description = "The IP address of the cluster master."
  sensitive   = true
  value       = module.gke_cluster.cluster_endpoint
}

# output "client_certificate" {
#   description = "Public certificate used by clients to authenticate to the cluster endpoint."
#   sensitive   = true
#   value       = module.gke_cluster.client_certificate
# }

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
  value       = module.gke_cluster.gke_ingress_public_ip
}

output "gke_ingress_public_ip_name" {
  description = "Public IP to be used for the ingress controller inside the cluster"
  value       = module.gke_cluster.gke_ingress_public_ip_name
}

# output "gke_ingress_private_ip" {
#   description = "Public IP to be used for the ingress controller inside the cluster"
#   value       = module.gke_cluster.gke_ingress_private_ip
# }

output "project_id" {
  description = "Project ID - to be used with auth modules in pipelines"
  value       = data.google_client_config.current.project
}

output "region" {
  description = "Region - to be used with auth modules in pipelines"
  value       = data.google_client_config.current.region
}
