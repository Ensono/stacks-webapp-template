resource "azurerm_monitor_scheduled_query_rules_alert" "default" {
  name                = var.alert_name
  location            = var.location
  resource_group_name = var.resource_group_name

  authorized_resource_ids = [var.application_insights_id]
  action {
    action_group           = []
    email_subject          = "Email Header"
    custom_webhook_payload = "{}"
  }
  data_source_id = var.application_insights_id
  description    = "Query may access data within multiple resources"
  enabled        = true
  # Count requests in multiple log resources and group into 5-minute bins by HTTP operation
  query = format(var.query, var.application_insights_id)
  severity    = 1
  frequency   = 5
  time_window = 30
  trigger {
    operator  = "GreaterThan"
    threshold = 3
  }
}

#  let a=requests
#    | where toint(resultCode) >= 500
#    | extend fail=1; let b=app('%s').requests
#    | where toint(resultCode) >= 500 | extend fail=1; a
#    | join b on fail