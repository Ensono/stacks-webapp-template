terraform {
  backend "azurerm" {
    # resource_group_name  = "amido-stacks-rg-uks"
    # storage_account_name = "amidostackstfstategbl"
    # container_name       = "tfstate"
    # # key                  = "spa-cycle-2"
  }
}

provider "azurerm" {
  subscription_id = var.subscription_id
  client_id       = var.client_id
  client_secret   = var.client_secret
  tenant_id       = var.tenant_id
}
