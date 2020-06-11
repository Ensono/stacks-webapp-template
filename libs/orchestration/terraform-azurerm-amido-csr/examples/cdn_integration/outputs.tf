output "cdn_endpoint" {
  description = "CDN endpoint hostname"
  value = module.static_website.cdn_endpoint
}

output "storage_endpoint" {
  description = "Blob Storage Static website endpoint"
  value = module.static_website.storage_endpoint
}

output "storage_account_key" {
  sensitive = true
  description = "Blob Storage Access Key"
  value = module.static_website.storage_account_key
}

output "dns_name" {
  description = "Dns FQDN for website"
  value = module.static_website.dns_name
}

output "resource_group_name" {
  description = "Resource Group name created to host the SPA resources"
  value = module.static_website.resource_group_name
}

output "storage_account_name" {
  description = "Storage Account name"
  value = module.static_website.storage_account_name
}
