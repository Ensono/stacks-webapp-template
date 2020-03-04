#!/bin/bash
resourceGroupName=$1
clusterName=$2
dnsZoneResourceGroup=$3
k8s_manifest=$4

namespace="external-dns"

# assign user managed identity to cluster vm scale set
nodeResourceGroup=$(az aks show --resource-group $resourceGroupName --name $clusterName --query 'nodeResourceGroup' --output tsv)
scaleSetName=$(az resource list --resource-group $nodeResourceGroup --resource-type "Microsoft.Compute/virtualMachineScaleSets" --query '[0].name' --output tsv)
identityResourceId=$(az resource list --resource-group $resourceGroupName --resource-type "Microsoft.ManagedIdentity/userAssignedIdentities"  --query '[0].id' --output tsv)
az vmss identity assign --resource-group $nodeResourceGroup --name $scaleSetName --identities $identityResourceId

# generate externaldns config file
jq -n --arg tenantId $AZURE_TENANT_ID --arg subscriptionId $AZURE_SUBSCRIPTION_ID --arg resourceGroup $dnsZoneResourceGroup '{"tenantId":$tenantId, "subscriptionId":$subscriptionId, "resourceGroup":$resourceGroup, "useManagedIdentityExtension": true }' > azure.json
kubectl create namespace $namespace --dry-run=true -o yaml | kubectl apply -f -
kubectl create --namespace $namespace secret generic azure-config-file --from-file=azure.json --dry-run=true -o yaml | kubectl apply -f -

# the manifest.yml file needs to be dynamically updateable - using Kustomize
kubectl --context $clusterName apply --namespace $namespace --validate=true --filename=$k8s_manifest
