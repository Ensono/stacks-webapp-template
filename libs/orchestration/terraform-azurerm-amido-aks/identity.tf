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
