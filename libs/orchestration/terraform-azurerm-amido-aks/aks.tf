# acr 
resource "azurerm_container_registry" "registry" {
  count               = var.create_acr ? 1 : 0
  name                = replace(var.resource_namer, "-", "")
  resource_group_name = azurerm_resource_group.default.name
  location            = var.resource_group_location
  admin_enabled       = var.registry_admin_enabled
  sku                 = var.registry_sku
  lifecycle {
    ignore_changes = [
      tags,
    ]
  }
}

# aks cluster
# this should not be an option otherwise cluster will fail if missing
resource "tls_private_key" "ssh_key" {
  count     = var.create_ssh_key ? 1 : 0
  algorithm = "RSA"
}

resource "azurerm_public_ip" "default" {
  count               = 1
  name                = format("${var.resource_namer}-%d", count.index)
  location            = var.resource_group_location
  resource_group_name = azurerm_resource_group.default.name
  allocation_method   = "Static"
  sku                 = "Standard"
  # timeouts {
  #   delete = 5
  # }
  lifecycle {
    create_before_destroy = true
    ignore_changes = [
      tags,
    ]
  }
}

resource "azurerm_kubernetes_cluster" "default" {
  count               = var.create_aks ? 1 : 0
  name                = var.resource_namer
  location            = var.resource_group_location
  resource_group_name = azurerm_resource_group.default.name
  dns_prefix          = var.dns_prefix
  kubernetes_version  = var.cluster_version
  linux_profile {
    admin_username = var.admin_username
    ssh_key {
      key_data = chomp(tls_private_key.ssh_key[0].public_key_openssh)
    }
  }

  default_node_pool {
    # TODO: variablise below:
    availability_zones = ["1", "2", "3"]
    type                = var.nodepool_type # "VirtualMachineScaleSets" # default
    enable_auto_scaling = var.enable_auto_scaling
    max_count           = var.max_nodes
    min_count           = var.min_nodes
    name                = "default"
    os_disk_size_gb     = var.os_disk_size
    vm_size             = var.vm_size
    node_count          = var.min_nodes
    vnet_subnet_id      = azurerm_subnet.default.0.id
  }

  addon_profile {
    http_application_routing {
      enabled = false
    }
    kube_dashboard {
      enabled = true
    }
    oms_agent {
      enabled                    = true
      log_analytics_workspace_id = azurerm_log_analytics_workspace.default.id
    }
  }

  role_based_access_control {
    enabled = true
  }

  enable_pod_security_policy = false

  network_profile {
    network_plugin    = var.advanced_networking_enabled ? "azure" : "kubenet"
    network_policy    = var.advanced_networking_enabled ? "azure" : null
    load_balancer_sku = "standard"
    # service_cidr    = "172.0.0.0/16"
    # load_balancer_profile {
    #   outbound_ip_address_ids = azurerm_public_ip.default[*].id
    # }
  }
  # TODO: this should be changed to UserAssigned once available
  # SPN should be removed once out of preview
  identity {
    type = "SystemAssigned"
  }

  # # TODO: remove this eventually 
  # # [here](https://docs.microsoft.com/en-us/azure/aks/use-managed-identity)
  # # this will be a more generic cloud approach
  # service_principal {
  #   client_id     = "msi"
  #   client_secret = "null" # ==> MSI ignores this value and is managed by AAD
  # }

  lifecycle {
    ignore_changes = [
      default_node_pool.0.node_count,
      windows_profile,
      tags
    ]
  }
  depends_on = [
    azurerm_virtual_network.default,
    azurerm_public_ip.default
  ]
}


resource "azurerm_role_assignment" "acr" {
  # scope                = data.azurerm_subscription.primary.id
  count                 = var.create_acr ? 1 : 0
  scope                = azurerm_container_registry.registry.0.id
  role_definition_name = "Contributor"
  principal_id         = azurerm_kubernetes_cluster.default.0.identity.0.principal_id
  depends_on = [
    azurerm_kubernetes_cluster.default
  ]
}

data "azurerm_resource_group" "aks_rg_id" {
  name = azurerm_kubernetes_cluster.default.0.node_resource_group
  depends_on = [
    azurerm_kubernetes_cluster.default
  ]
}

data "azurerm_user_assigned_identity" "aks_rg_id" {
  name                = "${var.resource_namer}-agentpool"
  resource_group_name = azurerm_kubernetes_cluster.default.0.node_resource_group
  depends_on = [
    azurerm_kubernetes_cluster.default
  ]
}

resource "azurerm_role_assignment" "acr2" {
  count                 = var.create_acr ? 1 : 0
  scope                = azurerm_container_registry.registry.0.id
  role_definition_name = "Contributor"
  principal_id         = data.azurerm_user_assigned_identity.aks_rg_id.principal_id 
  skip_service_principal_aad_check = true
  depends_on = [
    azurerm_kubernetes_cluster.default
  ]
  lifecycle {
    ignore_changes = [name]
  }
}

resource "azurerm_network_interface" "internal_ingress" {
  name                = var.resource_namer
  location            = var.resource_group_location
  resource_group_name = azurerm_kubernetes_cluster.default.0.node_resource_group
  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.default.0.id
    private_ip_address_allocation = "Static"
    private_ip_address            = cidrhost(var.subnet_prefixes.0, -3)
  }
  depends_on = [
    azurerm_kubernetes_cluster.default
  ]
}

resource "azurerm_public_ip" "external_ingress" {
  count               = 1
  name                = format("${var.resource_namer}-%d", count.index)
  location            = var.resource_group_location
  resource_group_name = azurerm_kubernetes_cluster.default.0.node_resource_group
  allocation_method   = "Static"
  sku                 = "Standard"
  # timeouts {
  #   delete = 5
  # }
  lifecycle {
    create_before_destroy = true
    ignore_changes = [
      tags,
    ]
  }
}
