resource "azurerm_monitor_scheduled_query_rules_alert" "default" {
  name                = var.alert_name
  location            = var.location
  resource_group_name = var.resource_group_name

  authorized_resource_ids = [var.application_insights_id]
  action {
    action_group           = var.action_group
    email_subject          = var.email_subject
  }
  data_source_id = var.application_insights_id
  description    = "Query may access data within multiple resources"
  enabled        = true
  query = format(var.query, var.application_insights_id)
  severity    = var.severity
  frequency   = var.frequency
  time_window = var.time_window
  trigger {
    operator  = var.operator
    threshold = var.threshold
  }
}
