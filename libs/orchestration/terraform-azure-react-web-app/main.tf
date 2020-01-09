module "spa_labels" {
  source     = "git::https://github.com/cloudposse/terraform-null-label.git?ref=0.16.0"
  namespace  = "${var.name_company}-${var.name_project}"
  stage      = var.stage
  name       = "spa"
  attributes = var.attributes
  delimiter  = "-"
  tags       = var.tags
}

resource "azurerm_resource_group" "spa" {
  count    = 0
  name     = module.spa_labels.id
  location = var.resource_location
  tags     = var.resource_tags
}

data "azurerm_client_config" "current" {}

# Probably best to create a module that handles the creation of all required resources to set up CSR react app
# includes:
# DNS
# Blob
# Resourcce group should be OPTIONAL as people might want to put in their own RG
#


resource "azurerm_storage_account" "spa" {
  name                      = replace(module.spa_labels.id, "-", "")
  # resource_group_name       = azurerm_resource_group.spa.name
  resource_group_name       = var.rg_name
  account_replication_type  = "LRS"
  location                  = var.resource_location
  account_kind              = "StorageV2"
  account_tier              = "Standard"
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
    az storage blob service-properties update \
      --subscription ${data.azurerm_client_config.current.subscription_id} \
      --account-name ${azurerm_storage_account.spa.name} \
      --static-website true \
      --404-document index.html \
      --index-document index.html
    EOF
  }
  depends_on = [azurerm_storage_account.spa]
}
# end module
