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
  name                = var.vnet_name
  resource_group_name = var.resource_group_name
  address_space       = var.vnet_cidr
  location            = var.resource_group_location
}

resource "azurerm_subnet" "default" {
  count               = var.create_aksvnet ? length(var.subnet_names) : 0
  name                = var.subnet_names[count.index]
  resource_group_name = var.resource_group_name
  # this can stay referencing above as they get created or not together
  virtual_network_name = azurerm_virtual_network.default.0.name
  address_prefix       = var.subnet_prefixes[count.index]
}

resource "azurerm_route_table" "default" {
  count               = var.create_aksvnet ? 1 : 0
  name                = "example-routetable"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name

  route {
    name                   = "example"
    address_prefix         = "10.100.0.0/14"
    next_hop_type          = "VirtualAppliance"
    next_hop_in_ip_address = "10.10.1.1"
  }
}

resource "azurerm_subnet_route_table_association" "default" {
  count               = var.create_aksvnet ? 1 : 0
  subnet_id      = azurerm_subnet.default.id
  route_table_id = azurerm_route_table.default.id
}

# DNS
# this is the base which will hold all your ingress records 
# ensure you provide the NS records to the TLD owner
resource "azurerm_dns_zone" "zone" {
  count               = var.create_dns_zone ? 1 : 0
  name                = var.dns_zone
  resource_group_name = var.resource_group_name
  zone_type           = "Public"
}

# resource "azurerm_dns_txt_record" "test" {
#   name                = "owner"
#   zone_name           = azurerm_dns_zone.zone[0].name
#   resource_group_name = azurerm_resource_group.env.name
#   ttl                 = 300

#   record {
#     value = "default"
#   }
# }

# bind ingress controller to IP to tld

# k8s identity
resource "random_string" "spn_password" {
  count   = var.create_aks_spn ? 1 : 0
  length  = 16
  special = true
}

resource "azuread_application" "spn" {
  count    = var.create_aks_spn ? 1 : 0
  name     = var.spn_name
  homepage = var.spn_url
}

resource "azuread_service_principal" "spn" {
  count          = var.create_aks_spn ? 1 : 0
  application_id = azuread_application.spn[0].application_id
}

resource "azuread_service_principal_password" "spn" {
  count                = var.create_aks_spn ? 1 : 0
  service_principal_id = azuread_service_principal.spn[0].id
  value                = var.generate_password ? random_string.spn_password[0].result : var.spn_password
  end_date             = timeadd(timestamp(), "add=17520h") # adding 2 years to spn
  lifecycle {
    ignore_changes = [
      end_date
    ]
  }
}

# acr 
module "aks-registry" {
  create_resource         = var.create_acr
  source                  = "git::https://github.com/amido/terraform-azure-acr.git"
  registry_name           = var.acr_registry_name
  resource_group_name     = var.resource_group_name
  resource_group_location = var.resource_group_location
}

# aks cluster
# this should not be an option otherwise cluster will fail if missing
resource "tls_private_key" "ssh_key" {
  count     = var.create_ssh_key ? 1 : 0
  algorithm = "RSA"
}

resource "azurerm_kubernetes_cluster" "default" {
  count               = var.enable_auto_scaling ? 1 : 0
  name                = var.cluster_name
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
    # max_pods        = var.max_pods != 0 ? var.max_pods : 1
    # enable_node_public_ip = false
    type                = var.nodepool_type # "VirtualMachineScaleSets" # default
    enable_auto_scaling = true
    max_count           = var.max_nodes
    min_count           = var.min_nodes
    name                = "default"
    os_disk_size_gb     = var.os_disk_size
    vm_size             = var.vm_size
    vnet_subnet_id      = var.vnet_subnet_id
  }

  network_profile {
    network_plugin = var.advanced_networking_enabled ? "azure" : "kubenet"
    network_policy = var.advanced_networking_enabled ? "azure" : null
  }

  service_principal {
    client_id     = var.client_id
    client_secret = var.client_secret
  }
  lifecycle {
    ignore_changes = [
      default_node_pool.node_count,
      node_count
    ]
  }
}
