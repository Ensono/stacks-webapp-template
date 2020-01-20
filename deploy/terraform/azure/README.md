# Shared Services for Static WebApp 

DESCRIPTION:
---



USAGE:
---

<!-- 
client_id - (Optional) The Client ID of the Service Principal. This can also be sourced from the ARM_CLIENT_ID environment variable.
client_secret - (Optional) The Client Secret of the Service Principal. This can also be sourced from the ARM_CLIENT_SECRET environment variable.
subscription_id - (Optional) The Subscription ID in which the Storage Account exists. This can also be sourced from the ARM_SUBSCRIPTION_ID environment variable.
tenant_id - (Optional) The Tenant ID in which the Subscription exists. This can also be sourced from the ARM_TENANT_ID environment variable.
 -->
To activate the terraform backend for running locally we need to initialise the SPN with env vars to avoid

```bash 
export ARM_CLIENT_ID=xxxx \
ARM_CLIENT_SECRET=yyyyy \
ARM_SUBSCRIPTION_ID=yyyyy \
ARM_TENANT_ID=yyyyy
```

alternatively you can run `az login` 

To get up and running locally you will want to create  a `terraform.tfvars` file 
````
subscription_id         = "xxxxx"
tenant_id               = "xxxxx"
client_id               = "xxxxx"
client_secret           = "xxxxx"
vnet_id                 = "amido-stacks-vnet-uks-dev"
rg_name                 = "amido-stacks-rg-uks-dev"
resource_group_location = "uksouth"
name_company            = "amido"
name_project            = "stacks"
name_component          = "spa"
name_environment        = "dev"
```

```
terraform workspace select dev || terraform workspace new dev
```

<!--  -->


terraform init -backend-config=./backend.local.tfvars
