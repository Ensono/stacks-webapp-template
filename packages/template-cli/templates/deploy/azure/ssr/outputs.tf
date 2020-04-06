output "vnet_name" {
  description = "Created VNET name.\nName can be deduced however it's better to create a direct dependency"
  value = var.create_aksvnet ? module.aks_bootstrap.vnet_name: ""
}

output "vnet_address_space" {
  description = "Specified VNET address space"
  value = var.create_aksvnet ? module.aks_bootstrap.vnet_address_space : []
}

output "vnet_address_id" {
  description = "Specified VNET Id"
  value = var.create_aksvnet ? module.aks_bootstrap.vnet_address_id : ""
}

output "resource_group_name" {
  description = "Created resource group Name"
  value = module.aks_bootstrap.resource_group_name
}

output "resource_group_id" {
  description = "Created resource group Id"
  value = module.aks_bootstrap.resource_group_id
}

output "aks_node_resource_group" {
  value = module.aks_bootstrap.aks_node_resource_group
}

### Identity ###
output "aks_default_user_identity_name" {
  value = var.create_user_identiy ? module.aks_bootstrap.aks_default._user_identity_name : ""
}

output "aks_default_user_identity_id" {
  value = var.create_user_identiy ? module.aks_bootstrap.aks_default.aks_default_user_identity_id : ""
}

output "aks_default_user_identity_client_id" {
  value = var.create_user_identiy ? module.aks_bootstrap.aks_default.aks_default_user_identity_client_id : ""
}
