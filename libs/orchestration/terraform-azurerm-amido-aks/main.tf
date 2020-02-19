# rg optional
resource "azurerm_resource_group" "default" {
  count    = var.create_rg ? 1 : 0
  name     = var.resource_group_name
  location = var.resource_group_location
  tags     = var.resource_group_tags
}

# NETWORK
resource "azurerm_virtual_network" "default" {
  count               = var.create_aksvnet ? 1 : 0
  name                = var.resource_namer
  resource_group_name = var.resource_group_name
  address_space       = var.vnet_cidr
  location            = var.resource_group_location
  depends_on = [ azurerm_resource_group.default ]
}

resource "azurerm_subnet" "default" {
  count               = var.create_aksvnet ? length(var.subnet_names) : 0
  name                = var.subnet_names[count.index]
  resource_group_name = var.resource_group_name
  # this can stay referencing above as they get created or not together
  virtual_network_name = azurerm_virtual_network.default.0.name
  address_prefix       = var.subnet_prefixes[count.index]
}

# TODO: enable this for custom networking within the cluster
# resource "azurerm_route_table" "default" {
#   count               = var.create_aksvnet ? 1 : 0
#   name                = "example-routetable"
#   location            = azurerm_resource_group.example.location
#   resource_group_name = azurerm_resource_group.example.name

#   route {
#     name                   = "example"
#     address_prefix         = "10.100.0.0/14"
#     next_hop_type          = "VirtualAppliance"
#     next_hop_in_ip_address = "10.10.1.1"
#   }
# }

# resource "azurerm_subnet_route_table_association" "default" {
#   count               = var.create_aksvnet ? 1 : 0
#   subnet_id      = azurerm_subnet.default.id
#   route_table_id = azurerm_route_table.default.id
# }

# DNS
# this is the base which will hold all your ingress records 
# ensure you provide the NS records to the TLD owner
resource "azurerm_dns_zone" "default" {
  count               = var.create_dns_zone ? 1 : 0
  name                = var.dns_zone
  resource_group_name = var.resource_group_name
  depends_on = [ azurerm_resource_group.default ]
}

resource "azurerm_private_dns_zone" "default" {
  count               = var.create_dns_zone ? 1 : 0
  name                = var.internal_dns_zone
  resource_group_name = var.resource_group_name
  depends_on = [ azurerm_resource_group.default ]
}

resource "azurerm_private_dns_zone_virtual_network_link" "default" {
  name    = var.resource_namer
  virtual_network_id = azurerm_virtual_network.default.0.id
  resource_group_name = var.resource_group_name
  private_dns_zone_name = var.internal_dns_zone
}

resource "azurerm_dns_a_record" "example" {
  name                = "test-1"
  zone_name           = azurerm_dns_zone.default.0.name
  resource_group_name = var.resource_group_name
  ttl                 = 300
  records             = azurerm_public_ip.default[*].ip_address
  depends_on = [
    azurerm_public_ip.default
  ]
}

# k8s identity

# acr 
resource "azurerm_container_registry" "registry" {
  count               = var.create_acr ? 1 : 0
  name                = replace(var.resource_namer, "-", "")
  resource_group_name = var.resource_group_name
  location            = var.resource_group_location
  admin_enabled       = var.registry_admin_enabled
  sku                 = var.registry_sku
}

# aks cluster
# this should not be an option otherwise cluster will fail if missing
resource "tls_private_key" "ssh_key" {
  count     = var.create_ssh_key ? 1 : 0
  algorithm = "RSA"
}

resource "azurerm_public_ip" "default" {
  count = 1
  name = format("${var.resource_namer}-%d",count.index)
  location = var.resource_group_location
  resource_group_name = var.resource_group_name
  allocation_method = "Static"
  sku = "Standard"
  # timeouts {
  #   delete = 5
  # }
  lifecycle {
    create_before_destroy = true
  }
  depends_on = [
    azurerm_resource_group.default
  ]
}

resource "azurerm_kubernetes_cluster" "default" {
  count               = var.create_aks ? 1 : 0
  name                = var.resource_namer
  location            = var.resource_group_location
  resource_group_name = var.resource_group_name
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
    availability_zones  = ["1","2","3"] # var.aks_azs
    # node_taints           = [] -> null
    # max_pods          = var.max_pods != 0 ? var.max_pods : 1
    # enable_node_public_ip = false
    type                = var.nodepool_type # "VirtualMachineScaleSets" # default
    enable_auto_scaling = var.enable_auto_scaling
    max_count           = var.max_nodes
    min_count           = var.min_nodes
    name                = "default"
    os_disk_size_gb     = var.os_disk_size
    vm_size             = var.vm_size
    node_count          = var.min_nodes
    # vnet_subnet_id      = var.vnet_subnet_id
    vnet_subnet_id      = azurerm_subnet.default.0.id
  }

  network_profile {
    network_plugin = var.advanced_networking_enabled ? "azure" : "kubenet"
    network_policy = var.advanced_networking_enabled ? "azure" : null
    load_balancer_sku = "standard"
    # service_cidr    = "172.0.0.0/16"

    load_balancer_profile {
        outbound_ip_address_ids = azurerm_public_ip.default[*].id
    }
  }
  # TODO: this should be changed to UserAssigned once available
  # SPN should be removed once out of preview
  identity {
    type = "SystemAssigned"
  }

  # TODO: remove this eventually 
  # [here](https://docs.microsoft.com/en-us/azure/aks/use-managed-identity)
  # this will be a more generic cloud approach
  service_principal {
    client_id     = var.client_id
    client_secret = var.client_secret
  }
  lifecycle {
    ignore_changes = [
      default_node_pool.0.node_count
    ]
  }
  depends_on = [ 
    azurerm_virtual_network.default,
    azurerm_public_ip.default
   ]
}
