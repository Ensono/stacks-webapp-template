resource "azurerm_cdn_profile" "default" {
  name                = var.resource_namer
  location            = "global"
  resource_group_name = azurerm_resource_group.default.name
  sku                 = "Standard_Microsoft"
  lifecycle {
    ignore_changes = [
      tags,
    ]
  }
}

resource "azurerm_cdn_endpoint" "default" {
  name                = var.resource_namer
  profile_name        = azurerm_cdn_profile.default.name
  location            = "global"
  resource_group_name = azurerm_resource_group.default.name

  origin {
    name      = var.resource_namer
    host_name = azurerm_storage_account.default.primary_web_host
  }
  origin_host_header = azurerm_storage_account.default.primary_web_host
  lifecycle {
    ignore_changes = [
      tags,
    ]
  }
}

# Workaround for setting custom domain on the CDN
resource "null_resource" "custom_domain" {
  triggers = {
    # trigger_hostname = lookup(sort(azurerm_cdn_endpoint.default.origin)[0], "host_name")
    trigger_hostname = local.app_hostname
  }
  provisioner "local-exec" {
    command = <<EOF
    az cdn custom-domain create --endpoint-name ${azurerm_cdn_endpoint.default.name} --hostname ${local.app_hostname} \
      --name ${var.resource_namer} \
      --profile-name ${azurerm_cdn_profile.default.name} \
      --resource-group ${azurerm_resource_group.default.name} \
      --subscription ${var.subscription_id}
    EOF
  }
  depends_on = [azurerm_storage_account.default, azurerm_dns_cname_record.default]
  lifecycle {
    ignore_changes = [
      id,
    ]
  }
}


# Workaround for a current bug
# CLI version 2.31 - still exists
# https://github.com/Azure/azure-cli/issues/12152
# can be set to az cli once fixed
# end goal to remove and make this part of terraform onec Go SDK from MS makes this possible 
# az cdn custom-domain enable-https --endpoint-name ${azurerm_cdn_endpoint.default.name} \
#   --name ${local.app_hostname} \
#   --profile-name ${azurerm_cdn_profile.default.name} \
#   --resource-group ${azurerm_resource_group.default.name} \
#   --subscription ${var.subscription_id}
resource "null_resource" "custom_domain_ssl" {
  triggers = {
    # trigger_hostname = lookup(sort(azurerm_cdn_endpoint.default.origin)[0], "host_name")
    trigger_hostname = local.app_hostname
  }
  provisioner "local-exec" {
    command = <<EOF
    az rest --method post --uri /subscriptions/${var.subscription_id}/resourceGroups/${azurerm_resource_group.default.name}/providers/Microsoft.Cdn/profiles/${azurerm_cdn_profile.default.name}/endpoints/${azurerm_cdn_endpoint.default.name}/customDomains/${var.resource_namer}/enableCustomHttps?api-version=2019-06-15-preview \
    --body "{\"certificateSource\":\"Cdn\",\"protocolType\":\"ServerNameIndication\",\"certificateSourceParameters\":{\"@odata.type\":\"#Microsoft.Azure.Cdn.Models.CdnCertificateSourceParameters\",\"certificateType\":\"Dedicated\"}}"
    EOF
  }
  depends_on = [null_resource.custom_domain]
  lifecycle {
    ignore_changes = [
      id,
    ]
  }
}

