# edit everything that has <EDIT_ME:> with the required data

variable "location" {
  default = "uksouth"
}

data "azurerm_client_config" "current" {}

data "azurerm_resource_group" "monitoring" {
  name = "<EDIT_ME: RESOURCE GROUP NAME>"
}

data "azurerm_application_insights" "monitoring" {
  name                = "<EDIT_ME: APPLICATION INSIGHTS NAME>"
  resource_group_name = data.azurerm_resource_group.monitoring.name
}

resource "azurerm_application_insights" "monitoring" {
  name                = "appinsights"
  location            = var.location
  resource_group_name = data.azurerm_resource_group.monitoring.name
  application_type    = "web"
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

module "query_alert" {
  source = "../../"
  alert_name = "test_alert"
  resource_group_name = data.azurerm_resource_group.monitoring.name
  application_insights_id = data.azurerm_application_insights.monitoring.id
  query = <<QUERY
  let a=requests
    | where toint(resultCode) >= 500
    | extend fail=1; let b=app('%s').requests
    | where toint(resultCode) >= 500 | extend fail=1; a
    | join b on fail
  QUERY
}

