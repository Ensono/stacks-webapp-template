##################################################
##  AKS SPN
##################################################
provider "azuread" {
  version = "~> 0.7"
}

# resource "random_string" "spn_password" {
#   # count   = "${var. ? 1 : 0 }"
#   count   = 1
#   length  = 16
#   special = true
#   # lifecycle
# }

# resource "azuread_application" "spn" {
#   count    = 1
#   name     = var.resource_namer
#   homepage = var.spn_url
# }

# resource "azuread_service_principal" "spn" {
#   # count          = var.create_resource ? 1 : 0
#   count          = 1
#   application_id = azuread_application.spn[0].application_id
# }

# resource "azuread_service_principal_password" "spn" {
#   # count                = "${var.create_resource ? 1 : 0 }"
#   count                = 1
#   service_principal_id = azuread_service_principal.spn[0].id
#   value                = random_string.spn_password[0].result
#   end_date             = timeadd(timestamp(), "add=17520h")
#   # lifecycle {
#   # }
# }

# KEY VAULT
resource "azurerm_key_vault" "default" {
  count                       = 1
  name                        = var.resource_namer
  location                    = var.resource_group_location
  resource_group_name         = var.resource_group_name
  enabled_for_disk_encryption = true
  # current RG owner tenant ID
  tenant_id                   = var.tenant_id
  # soft_delete_enabled         = true
  # purge_protection_enabled    = false

  sku_name = "standard"

  access_policy {
    tenant_id = var.tenant_id
    object_id = var.spn_object_id
    # tenant_id = data.azurerm_client_config.current.tenant_id
    # object_id = data.azurerm_client_config.current.service_principal_object_id

    key_permissions = [
      "get",
    ]

    secret_permissions = [
      "get",
    ]

    storage_permissions = [
      "get",
    ]
  }

  network_acls {
    default_action = "Deny"
    bypass         = "AzureServices"
  }

  depends_on = [
    azurerm_resource_group.default
  ]
}

resource "azurerm_user_assigned_identity" "cluster_identity" {
  name                = var.resource_namer
  resource_group_name = var.resource_group_name
  location            = var.resource_group_location
}


resource "azurerm_role_assignment" "cluster_spn_to_env_rg" {
  scope                = azurerm_resource_group.default[0].id
  role_definition_name = "Contributor"
  # principal_id         = var.create_aksspn ? element(concat(azuread_service_principal.spn.*.id, list("")), 0) : var.cluster_spn_objectid
  # principal_id         = element(concat(azuread_service_principal.spn.*.id, list("")), 0)
  principal_id         = var.spn_object_id
}

resource "azurerm_role_assignment" "cluster_spn_to_keyvault" {
  scope                = azurerm_key_vault.default[0].id
  role_definition_name = "Contributor"
  # principal_id         = var.create_aksspn ? element(concat(azuread_service_principal.spn.*.id, list("")), 0) : var.cluster_spn_objectid
  # principal_id         = element(concat(azuread_service_principal.spn.*.id, list("")), 0)
  principal_id         = var.spn_object_id
}

resource "azurerm_role_assignment" "cluster_identity_to_dns_zone" {
  count                = var.create_dns_zone ? 1 : 0
  scope                = azurerm_dns_zone.default[0].id
  role_definition_name = "Contributor"
  principal_id         = var.spn_object_id
  # principal_id         = element(concat(azuread_service_principal.spn.*.id, list("")), 0)
  # principal_id         = var.create_aksspn ? module.aks-spn.spn_objectid : var.cluster_spn_objectid
  # used with managed identity
  # principal_id         = azurerm_user_assigned_identity.cluster_identity.principal_id
}
