# PROJECT_NAME

DESCRIPTION:
---
Bootstraps the infrastructure for {{SELECT_APP_TYPE }}. 

Will be used within the provisioned pipeline for your application depending on the options you chose.

Pipeline implementation for infrastructure relies on workspaces, you can pass in whatever workspace you want from {{ SELECT_DEPLOYMENT_TYPE }} pipeline YAML.

PREREQUISITES:
---
Azure Subscripion
  - SPN 
    - Terraform will use this to perform the authentication for the API calls
    - you will need the `client_id, subscription_id, client_secret, tenant_id`

Terraform backend
  - resource group (can be manually created for the terraform remote state)
  - Blob storage container for the remote state management


USAGE:
---

To activate the terraform backend for running locally we need to initialise the SPN with env vars to ensure you are running the same way as the pipeline that will ultimately be running any incremental changes.


```bash 
export ARM_CLIENT_ID=xxxx \
ARM_CLIENT_SECRET=yyyyy \
ARM_SUBSCRIPTION_ID=yyyyy \
ARM_TENANT_ID=yyyyy
```

alternatively you can run `az login` 

To get up and running locally you will want to create  a `terraform.tfvars` file 
```bash
TFVAR_CONTENTS = '''
vnet_id                 = "amido-stacks-vnet-uks-dev"
rg_name                 = "amido-stacks-rg-uks-dev"
resource_group_location = "uksouth"
name_company            = "amido"
name_project            = "stacks"
name_component          = "spa"
name_environment        = "dev"
'''
$TFVAR_CONTENTS > terraform.tfvars
```

```
terraform workspace select dev || terraform workspace new dev
```

terraform init -backend-config=./backend.local.tfvars
