# We are keeping this as a lookup
# since proper conventions for naming of resources should be followed 
# and things can always be looked up without resorting to cross state searches
data "azurerm_public_ip" "app_gateway" {
  name                = var.app_gateway_frontend_ip_name
  resource_group_name = var.resource_group_name
}
