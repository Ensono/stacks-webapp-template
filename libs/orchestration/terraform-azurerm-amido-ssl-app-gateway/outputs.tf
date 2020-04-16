data "azurerm_public_ip" "default" {
  name                = azurerm_public_ip.app_gateway.name
  resource_group_name = var.resource_group_name
}

output "app_gateway_ip" {
  description = "Application Gateway public IP. Should be used with DNS provider at a top level. Can have multiple subs pointing to it - e.g. app.sub.domain.com, app-uat.sub.domain.com. App Gateway will perform SSL termination for all "
  value = data.azurerm_public_ip.default.ip_address
}
