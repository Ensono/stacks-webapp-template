# Probably best to create a module that handles the creation of all required resources to set up CSR react app
# includes:
# DNS 
# Blob X
# Resourcce group should be OPTIONAL as people might want to put in their own RG
#
# Always create and manage an RG as part of this library
resource "azurerm_resource_group" "default" {
  name     = var.resource_namer
  location = var.resource_group_location
  tags     = var.resource_tags
  lifecycle {
    ignore_changes = [
      tags,
    ]
  }
}

# DNS
# this is the base which will hold all your ingress records 
# ensure you provide the NS records to the TLD owner
resource "azurerm_dns_zone" "default" {
  # count               = var.create_dns_zone ? 1 : 0
  name                = var.dns_zone
  resource_group_name = azurerm_resource_group.default.name
  depends_on = [azurerm_resource_group.default]
  lifecycle {
    ignore_changes = [
      tags,
    ]
  }
}

resource "azurerm_storage_account" "default" {
  name = substr(replace(var.resource_namer, "-", ""), 0, 24)
  resource_group_name       = azurerm_resource_group.default.name
  account_replication_type  = var.account_replication_type
  location                  = var.resource_group_location
  account_kind              = var.account_kind
  account_tier              = var.account_tier
  enable_https_traffic_only = true
  tags                      = var.resource_tags
  lifecycle {
    ignore_changes = [
      tags,
    ]
  }
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
    az storage blob service-properties update \
      --subscription ${var.subscription_id} \
      --account-name ${azurerm_storage_account.default.name} \
      --account-key ${azurerm_storage_account.default.primary_access_key} \
      --static-website true \
      --404-document index.html \
      --index-document index.html
    EOF
  }
  depends_on = [azurerm_storage_account.default]
   lifecycle {
    ignore_changes = [
      id,
    ]
  }
}

# end module
