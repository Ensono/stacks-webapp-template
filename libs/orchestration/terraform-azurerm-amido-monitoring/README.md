# PROJECT_NAME

DESCRIPTION:
---
this sets up monitoring and alerting

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
docker run -it --rm -v $(pwd):/opt/tf-lib amidostacks/ci-tf:latest /bin/bash
```

```bash 
export ARM_CLIENT_ID=xxxx \
ARM_CLIENT_SECRET=yyyyy \
ARM_SUBSCRIPTION_ID=yyyyy \
ARM_TENANT_ID=yyyyy
```

alternatively you can run `az login` 

To get up and running locally you will want to create  a `terraform.tfvars` file 
```bash
TFVAR_CONTENTS='''
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

| Name | Version |
|------|---------|
| azurerm | n/a |
| tls | n/a |

To call the module you'll need:
| Name | Description | Notes |
|------|-------------|-------|
| alert_name | The name of the alert you wish to create | |
| resource_group_name | The name of you the resource group you wish to use | you may need to create one but otherwise put the name into the monitoring resource_group data lookup|
| application_insights_id | the application insights id you wish to use | if you don't have one you'll need to create it otherwise use the azurerm_application_insights monitoring data lookup |
| query | this is a query written in Azures log query language Kusto | see this URL if you need more information https://docs.microsoft.com/en-us/azure/azure-monitor/log-query/get-started-queries |
| operator | the operator for the trigger | defaults to greater than |
| threshold | the threshold for the trigger | basically when this will alert |
| time_window | the timeout window for the alert | |
| frequency | the frequency of the check in minuites | defaults to 5 |
| severity | the severity of the alert, 0 to 4 | defaults to 1 |

It's also useful to know that the module predfines the trigger with just the operator and threshold and no metric_trigger. Should you wish to have a metric trigger you'll need to edit the monitoring.tf file.
