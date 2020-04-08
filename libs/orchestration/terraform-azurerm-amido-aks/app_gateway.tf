resource "azurerm_subnet" "frontend" {
  name                 = var.resource_namer
  resource_group_name  = var.resource_group_name
  virtual_network_name = var.vnet_name
  address_prefix       = var.subnet_front_end_prefix
}

resource "azurerm_subnet" "backend" {
  name                 = "backend"
  resource_group_name  = var.resource_group_name
  virtual_network_name = var.vnet_name
  address_prefix       = "10.254.2.0/24"
}

resource "azurerm_public_ip" "app_gateway" {
  name                 = var.resource_namer
  resource_group_name  = var.resource_group_name
  location            = var.resource_group_location
  allocation_method    = "Dynamic"
}

# since these variables are re-used - a locals block makes this more maintainable
locals {
  backend_address_pool_name      = "${var.vnet_name}-beap"
  frontend_port_name             = "${var.vnet_name}-feport"
  frontend_ip_configuration_name = "${var.vnet_name}-feip"
  http_setting_name              = "${var.vnet_name}-be-htst"
  listener_name                  = "${var.vnet_name}-httplstn"
  request_routing_rule_name      = "${var.vnet_name}-rqrt"
  redirect_configuration_name    = "${var.vnet_name}-rdrcfg"
}

resource "azurerm_application_gateway" "network" {
  name                = var.resource_namer
  resource_group_name  = var.resource_group_name

  location            = var.resource_group_location

  sku {
    name     = "Standard_Small"
    tier     = "Standard"
    capacity = 2
  }

  gateway_ip_configuration {
    name      = "${var.resource_namer}-gateway-ip-configuration"
    subnet_id = azurerm_subnet.frontend.id
  }

  frontend_port {
    name = local.frontend_port_name
    port = 80
  }

  frontend_ip_configuration {
    name                 = local.frontend_ip_configuration_name
    public_ip_address_id = azurerm_public_ip.app_gateway.id
  }

  backend_address_pool {
    name = local.backend_address_pool_name
    # fqdn_list = []
  }

# 51.140.30.3 (0c2fb70b-9e60-4153-bd97-7ecb9ba2303a.cloudapp.net)
  backend_http_settings {
    name                  = local.http_setting_name
    cookie_based_affinity = "Disabled"
    path                  = "/path1/"
    port                  = 80
    protocol              = "Http"
    request_timeout       = 1
  }

  http_listener {
    name                           = local.listener_name
    frontend_ip_configuration_name = local.frontend_ip_configuration_name
    frontend_port_name             = local.frontend_port_name
    protocol                       = "Http"
  }

  request_routing_rule {
    name                       = local.request_routing_rule_name
    rule_type                  = "Basic"
    http_listener_name         = local.listener_name
    backend_address_pool_name  = local.backend_address_pool_name
    backend_http_settings_name = local.http_setting_name
  }
}
