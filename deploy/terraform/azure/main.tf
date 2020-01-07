resource "azurerm_resource_group" "spa" {
  name     = local.resource_group_name
  location = var.resource_location
  tags     = var.resource_tags
}

resource "azurerm_storage_account" "spa" {
  name                      = local.storage_account_name
  resource_group_name       = azurerm_resource_group.spa.name
  account_replication_type  = "LRS"
  location                  = azurerm_resource_group.spa.location
  account_kind              = "StorageV2"
  account_tier              = "Standard"
  enable_https_traffic_only = true
  tags                      = var.resource_tags
}

# Workaround to enable static website hosting on a storage account
# https://github.com/terraform-providers/terraform-provider-azurerm/issues/1903
resource "null_resource" "static_website_cmd" {

  provisioner "local-exec" {
    command = <<EOF
    az extension add --name storage-preview
    az storage blob service-properties update \
      --subscription ${var.subscription_id} \
      --account-name ${azurerm_storage_account.spa.name} \
      --static-website \
      --404-document index.html \
      --index-document index.html
    EOF
  }
  depends_on = [azurerm_storage_account.spa]
}