output "cdn_endpoint" {
  description = "CDN endpoint hostname"
  value = azurerm_cdn_endpoint.default.host_name
}

output "storage_endpoint" {
  description = "Blob Storage Static website endpoint"
  value = azurerm_storage_account.default.primary_web_host
}

output "storage_account_key" {
  sensitive = true
  description = "Blob Storage Access Key"
  value = azurerm_storage_account.default.primary_access_key
}

output "dns_name" {
  description = "Dns FQDN for website"
  value = trimsuffix(azurerm_dns_cname_record.default.fqdn, ".")
}

output "resource_group_name" {
  description = "Resource Group name created to host the SPA resources"
  value = azurerm_resource_group.default.name
}

output "storage_account_name" {
  description = "Storage Account name"
  value = azurerm_storage_account.default.name
}
