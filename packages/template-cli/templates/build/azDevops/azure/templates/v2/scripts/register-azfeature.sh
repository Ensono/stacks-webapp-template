#!/bin/bash

azure_feature_name="$1"
azure_feature_provider="$2"


OUTPUT=$(az feature show --namespace $azure_feature_provider --name $azure_feature_name
if echo "$OUTPUT" | grep -q "Registered"; then
    echo "$azure_feature_name feature registered"
else
  echo "Registering feature $azure_feature_name"
  az feature register --namespace $azure_feature_provider --name $azure_feature_name
  az provider register -n $azure_feature_provider
fi
