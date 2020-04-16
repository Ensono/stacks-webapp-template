variable "alert_name" {
}

variable "location" {
  default = "UK South"
}


resource "azurerm_resource_group" "default" {
  name     = "monitoring-resources"
  location = var.location
}

resource "azurerm_application_insights" "default" {
  name                = "appinsights"
  location            = var.location
  resource_group_name = azurerm_resource_group.default.name
  application_type    = "web"
}

resource "azurerm_monitor_scheduled_query_rules_alert" "default" {
  name                = var.alert_name
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name

  authorized_resource_ids = [azurerm_application_insights.default.id]
  action {
    action_group           = []
    email_subject          = "Email Header"
    custom_webhook_payload = "{}"
  }
  data_source_id = azurerm_application_insights.default.id
  description    = "Query may access data within multiple resources"
  enabled        = true
  # Count requests in multiple log resources and group into 5-minute bins by HTTP operation
  query = format(<<-QUERY
  let a=requests
    | where toint(resultCode) >= 500
    | extend fail=1; let b=app('%s').requests
    | where toint(resultCode) >= 500 | extend fail=1; a
    | join b on fail
QUERY
  , azurerm_application_insights.default.id)
  severity    = 1
  frequency   = 5
  time_window = 30
  trigger {
    operator  = "GreaterThan"
    threshold = 3
  }
}
