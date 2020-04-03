##################################################
# Observability

resource "azurerm_log_analytics_workspace" "default" {
  name                = var.resource_namer
  resource_group_name = azurerm_resource_group.default.name
  location            = var.resource_group_location
  sku                 = "PerGB2018"
  retention_in_days   = var.retention_in_days
  depends_on = [azurerm_resource_group.default]
  lifecycle {
    ignore_changes = [
      tags,
    ]
  }
}

resource "azurerm_log_analytics_solution" "default" {
  solution_name         = "ContainerInsights"
  resource_group_name   = azurerm_resource_group.default.name
  location              = var.resource_group_location
  workspace_resource_id = azurerm_log_analytics_workspace.default.id
  workspace_name        = azurerm_log_analytics_workspace.default.name
  depends_on = [azurerm_resource_group.default]
  plan {
    publisher = "Microsoft"
    product   = "OMSGallery/ContainerInsights"
  }
}

resource "azurerm_application_insights" "default" {
  name                = var.resource_namer
  resource_group_name = azurerm_resource_group.default.name
  location            = var.resource_group_location
  application_type    = var.log_application_type
  depends_on = [azurerm_resource_group.default]
  lifecycle {
    ignore_changes = [
      tags,
    ]
  }
}
