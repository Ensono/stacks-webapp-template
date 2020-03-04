#!/bin/bash
resource_group_name=$1
aks_cluster_name=$2

echo "Getting cluster credentials"
az aks get-credentials --overwrite-existing --resource-group $resource_group_name --name $aks_cluster_name
