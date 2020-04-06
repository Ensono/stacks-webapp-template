output "vnet_name" {
  description = "Created VNET name.\nName can be deduced however it's better to create a direct dependency"
  value = var.create_aksvnet ? azurerm_virtual_network.default.0.name : ""
}

output "vnet_address_space" {
  description = "Specified VNET address space"
  value = var.create_aksvnet ? azurerm_virtual_network.default.0.address_space : []
}

output "vnet_address_id" {
  description = "Specified VNET Id"
  value = var.create_aksvnet ? azurerm_virtual_network.default.0.id : ""
}

output "resource_group_name" {
  description = "Created resource group Name"
  value = azurerm_resource_group.default.name
  depends_on = [azurerm_resource_group.default]
}

output "resource_group_id" {
  description = "Created resource group Id"
  value = azurerm_resource_group.default.id
  depends_on = [azurerm_resource_group.default]
}

# output "aks_vmss" {
#   value = azurerm_kubernetes_cluster.default.
# }

output "aks_node_resource_group" {
  value = azurerm_kubernetes_cluster.default.0.node_resource_group
}

### Identity ###
output "aks_default_user_identity_name" {
  value = var.create_user_identiy ? azurerm_user_assigned_identity.default.0.name : ""
}

output "aks_default_user_identity_id" {
  value = var.create_user_identiy ? azurerm_user_assigned_identity.default.0.id : ""
}

output "aks_default_user_identity_client_id" {
  value = var.create_user_identiy ? azurerm_user_assigned_identity.default.0.client_id : ""
}
