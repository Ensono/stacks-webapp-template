# Example of further extensions to Stacks Core templates
# Potential user defined extensions
data "azurerm_application_insights" "example" {
  name                = var.app_insights_name
  resource_group_name = var.core_resource_group
}

output "app_insights_instrumentation_key" {
  description = "App Insights key for downstream deploymnent use"
  value       = data.azurerm_application_insights.example.instrumentation_key
  sensitive   = true
}

variable app_insights_name {
  type        = string
  default     = ""
  description = "app insights name for key retriaval in memory"
}
