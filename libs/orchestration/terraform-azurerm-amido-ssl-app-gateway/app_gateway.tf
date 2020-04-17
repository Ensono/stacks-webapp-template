resource "azurerm_subnet" "frontend" {
  name                 = var.resource_namer
  resource_group_name  = var.resource_group_name
  virtual_network_name = var.vnet_name
  address_prefix       = var.subnet_front_end_prefix
  depends_on          = [var.vnet_name]
}

resource "azurerm_subnet" "backend" {
  name                 = "backend"
  resource_group_name  = var.resource_group_name
  virtual_network_name = var.vnet_name
  address_prefix       = var.subnet_backend_end_prefix
  depends_on          = [var.vnet_name]
}

resource "azurerm_public_ip" "app_gateway" {
  name                 = var.resource_namer
  resource_group_name  = var.resource_group_name
  location             = var.resource_group_location
  allocation_method    = "Dynamic"
  lifecycle {
    ignore_changes = [
      tags,
    ]
  }
}

# since these variables are re-used - a locals block makes this more maintainable
locals {
  backend_address_pool_name      = "${var.vnet_name}-beap"
  frontend_port_name             = "${var.vnet_name}-feport"
  frontend_port_name_ssl         = "${var.vnet_name}-feportssl"
  frontend_ip_configuration_name = "${var.vnet_name}-feip"
  http_setting_name              = "${var.vnet_name}-be-htst"
  listener_name                  = "${var.vnet_name}-httplstn"
  listener_name_ssl              = "${var.vnet_name}-httplstn_ssl"
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

  frontend_port {
    name = local.frontend_port_name_ssl
    port = 443
  }

  http_listener {
    name                           = local.listener_name
    frontend_ip_configuration_name = local.frontend_ip_configuration_name
    frontend_port_name             = local.frontend_port_name
    protocol                       = "Http"
  }

  http_listener {
    name                           = local.listener_name_ssl
    frontend_ip_configuration_name = local.frontend_ip_configuration_name
    frontend_port_name             = local.frontend_port_name_ssl
    protocol                       = "Https"
    ssl_certificate_name           = "frontend"
  }

  ssl_certificate {
    name     = "frontend"
    data     = filebase64("${abspath(path.root)}/certs/${var.dns_zone}.pfx")
    password = var.pfx_password
  }

  redirect_configuration {
    name = "letsencrypt_auth_challange"
    redirect_type = "Permanent"
    target_url  = "${azurerm_storage_account.default.0.primary_blob_endpoint}public"
    include_path = true
    include_query_string = true
  }

  url_path_map {
    name                               = "PathBasedRoutingRulePathMap"
    default_backend_address_pool_name  = local.backend_address_pool_name
    default_backend_http_settings_name = local.http_setting_name
    path_rule {
      name                       = "letsencrypt"
      redirect_configuration_name = "letsencrypt_auth_challange"
      paths                      = ["/.well-known/acme-challenge/*"]
    }
  }

  frontend_ip_configuration {
    name                 = local.frontend_ip_configuration_name
    public_ip_address_id = azurerm_public_ip.app_gateway.id
  }

  backend_address_pool {
    name = local.backend_address_pool_name
    ip_addresses = [var.aks_ingress_public_ip]
  }

  probe {
    name = "k8s-probe"
    host = "127.0.0.1"
    protocol = "Http"
    interval = 15
    unhealthy_threshold = 4
    timeout = 15
    path = "/healthz"
    match {
      status_code = ["200"]
    }
  }

  backend_http_settings {
    name                  = local.http_setting_name
    cookie_based_affinity = "Disabled"
    port                  = 80
    protocol              = "Http"
    request_timeout       = 10
    probe_name            = "k8s-probe"
  }

  request_routing_rule {
    name                       = local.request_routing_rule_name
    rule_type                  = "Basic"
    http_listener_name         = local.listener_name_ssl
    backend_address_pool_name  = local.backend_address_pool_name
    backend_http_settings_name = local.http_setting_name
  }

  request_routing_rule {
    name                       = "${local.request_routing_rule_name}-letsencrypt"
    rule_type                  = "PathBasedRouting"
    http_listener_name         = local.listener_name
    redirect_configuration_name = "letsencrypt_auth_challange"
    url_path_map_name =  "PathBasedRoutingRulePathMap"
  }

  lifecycle {
    ignore_changes = [
      tags,
    ]
  }
}

