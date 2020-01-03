##################################################
# ResourceGroups

resource "azurerm_resource_group" "env" {
  name     = local.resource_group_name_env
  location = var.resource_group_location_env
  tags     = var.resource_group_tags
}