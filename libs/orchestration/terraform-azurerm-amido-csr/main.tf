resource "azurerm_resource_group" "default" {
  # count    = 0
  name     = var.rg_name
  location = var.resource_location
  tags     = var.resource_tags
}
# Probably best to create a module that handles the creation of all required resources to set up CSR react app
# includes:
# DNS 
# Blob X
# Resourcce group should be OPTIONAL as people might want to put in their own RG
#
resource "azurerm_storage_account" "default" {
  name = substr(replace(var.rg_name, "-", ""), 0, 24)
  # resource_group_name       = azurerm_resource_group.spa.name
  resource_group_name       = azurerm_resource_group.default.name
  account_replication_type  = var.account_replication_type
  location                  = var.resource_location
  account_kind              = var.account_kind
  account_tier              = var.account_tier
  enable_https_traffic_only = true
  tags                      = var.resource_tags
}
# Workaround to enable static website hosting on a storage account
# https://github.com/terraform-providers/terraform-provider-azurerm/issues/1903
resource "null_resource" "static_website_cmd" {
  triggers = {
    index    = var.index_document
    notfound = var.notfound_document
  }
  provisioner "local-exec" {
    command = <<EOF
    az extension add --name storage-preview 
    az storage blob service-properties update \
      --subscription ${var.subscription_id} \
      --account-name ${azurerm_storage_account.default.name} \
      --static-website true \
      --404-document index.html \
      --index-document index.html
    EOF
  }
  depends_on = [azurerm_storage_account.default]
}
# end module
