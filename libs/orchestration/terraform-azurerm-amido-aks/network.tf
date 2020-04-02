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
  depends_on          = [azurerm_resource_group.default]
}

resource "azurerm_subnet" "default" {
  count               = var.create_aksvnet ? length(var.subnet_names) : 0
  name                = var.subnet_names[count.index]
  resource_group_name = var.resource_group_name
  # this can stay referencing above as they get created or not together
  virtual_network_name = azurerm_virtual_network.default.0.name
  address_prefix       = var.subnet_prefixes[count.index]
  depends_on          = [azurerm_virtual_network.default]

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
  depends_on          = [azurerm_resource_group.default]
}

resource "azurerm_private_dns_zone" "default" {
  count               = var.create_dns_zone ? 1 : 0
  name                = var.internal_dns_zone
  resource_group_name = var.resource_group_name
  depends_on          = [azurerm_resource_group.default]
}

resource "azurerm_private_dns_zone_virtual_network_link" "default" {
  name                  = var.resource_namer
  virtual_network_id    = azurerm_virtual_network.default.0.id
  resource_group_name   = var.resource_group_name
  private_dns_zone_name = var.internal_dns_zone
  depends_on = [
    azurerm_virtual_network.default
  ]
}

# resource "azurerm_dns_a_record" "example" {
#   name                = "test-1"
#   zone_name           = azurerm_dns_zone.default.0.name
#   resource_group_name = var.resource_group_name
#   ttl                 = 300
#   records             = azurerm_public_ip.default[*].ip_address
#   depends_on = [
#     azurerm_public_ip.default
#   ]
# }
