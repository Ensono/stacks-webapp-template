#!/bin/bash

azure_tenant_id="$1"
azure_subscription_id="$2"
azure_client_id="$3"
azure_client_secret="$4"

echo "Azure Client ID = $azure_client_id"
echo "Azure Client Secret = $azure_client_secret"
echo "Azure Subscription ID = $azure_subscription_id"
echo "Azure Tenant ID = $azure_tenant_id"

echo "Logging in to Azure"
az login --service-principal --username $azure_client_id --password $azure_client_secret --tenant $azure_tenant_id
az account set -s $azure_subscription_id
