data "azurerm_client_config" "current" {}

variable "location" {
  default = "UK South"
}

resource "azurerm_application_insights" "monitoring" {
  name                = "appinsights"
  location            = var.location
  resource_group_name = azurerm_resource_group.monitoring.name
  application_type    = "web"
}

resource "azurerm_resource_group" "monitoring" {
  name     = "aidan-test-monitoring-resources"
  location = var.location
}

module "default_label" {
  source     = "git::https://github.com/cloudposse/terraform-null-label.git?ref=0.16.0"
  namespace  = "${var.name_company}-${var.name_project}"
  stage      = var.stage
  name       = var.name_component
  attributes = var.attributes
  delimiter  = "-"
  tags       = var.tags
}

# if you do not set the 
# `service_cidr`
# `dns_service_ip`
# `docker_bridge_cidr` 
# AKS will default to ==> 10.0.0.0/16
variable "vnet_cidr" {
  default = ["10.1.0.0/16"]
}

module "query_alert" {
  source = "../../"
  alert_name = "aidan_test"
  resource_group_name = azurerm_resource_group.monitoring.name
  application_insights_id = azurerm_application_insights.monitoring.id
  query = <<QUERY
  let a=requests
    | where toint(resultCode) >= 500
    | extend fail=1; let b=app('%s').requests
    | where toint(resultCode) >= 500 | extend fail=1; a
    | join b on fail
  QUERY
}

