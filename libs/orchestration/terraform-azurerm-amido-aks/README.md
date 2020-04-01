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

## Providers

| Name | Version |
|------|---------|
| azurerm | n/a |
| tls | n/a |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:-----:|
| acr\_registry\_name | n/a | `string` | `"myacrregistry"` | no |
| admin\_username | n/a | `string` | `"ubuntu"` | no |
| advanced\_networking\_enabled | n/a | `bool` | `true` | no |
| attributes | n/a | `list` | `[]` | no |
| client\_id | SPN values | `string` | n/a | yes |
| client\_secret | n/a | `string` | n/a | yes |
| cluster\_name | n/a | `string` | `"akscluster"` | no |
| cluster\_version | n/a | `string` | `"1.15.7"` | no |
| create\_acr | ########################## ACR SETTINGS ######################### | `bool` | `true` | no |
| create\_aks | n/a | `bool` | `true` | no |
| create\_aks\_spn | ########################## IDENTITY SETTINGS ######################### | `bool` | `true` | no |
| create\_aksvnet | n/a | `bool` | `true` | no |
| create\_dns\_zone | n/a | `bool` | `true` | no |
| create\_rg | ########################## CONDITIONAL SETTINGS ######################### | `bool` | `true` | no |
| create\_ssh\_key | n/a | `bool` | `true` | no |
| dns\_prefix | n/a | `string` | `"aks"` | no |
| dns\_zone | ########################## DNS SETTINGS ######################### | `string` | `""` | no |
| enable\_auto\_scaling | n/a | `bool` | `false` | no |
| generate\_password | n/a | `bool` | `true` | no |
| internal\_dns\_zone | n/a | `string` | `""` | no |
| location\_name\_map | Each region must have corresponding a shortend name for resource naming purposes | `map(string)` | <pre>{<br>  "eastasia": "ase",<br>  "eastus": "use",<br>  "eastus2": "use2",<br>  "northeurope": "eun",<br>  "southeastasia": "asse",<br>  "uksouth": "uks",<br>  "ukwest": "ukw",<br>  "westeurope": "euw",<br>  "westus": "usw"<br>}</pre> | no |
| log\_application\_type | n/a | `string` | `"other"` | no |
| max\_nodes | n/a | `number` | `10` | no |
| max\_pods | n/a | `number` | `100` | no |
| min\_nodes | n/a | `number` | `1` | no |
| name\_company | n/a | `string` | n/a | yes |
| name\_component | n/a | `string` | n/a | yes |
| name\_environment | n/a | `string` | n/a | yes |
| name\_project | n/a | `string` | n/a | yes |
| node\_count | n/a | `number` | `0` | no |
| nodepool\_type | n/a | `string` | `"VirtualMachineScaleSets"` | no |
| oms\_ws\_list\_of\_one | n/a | `list(map(string))` | <pre>[<br>  {}<br>]</pre> | no |
| os\_disk\_size | DEFAULTS TO 30 if not overwritten | `number` | `30` | no |
| registry\_admin\_enabled | n/a | `bool` | `true` | no |
| registry\_sku | n/a | `string` | `"Standard"` | no |
| resource\_group\_location | n/a | `string` | `"uksouth"` | no |
| resource\_group\_name | n/a | `string` | n/a | yes |
| resource\_group\_tags | n/a | `map(string)` | `{}` | no |
| resource\_namer | n/a | `string` | `"genericname"` | no |
| retention\_in\_days | n/a | `number` | `30` | no |
| spn\_name | n/a | `string` | `"aksspn"` | no |
| spn\_object\_id | n/a | `string` | n/a | yes |
| spn\_password | n/a | `string` | `"change12me"` | no |
| spn\_url | n/a | `string` | `"https://stacks.azure.com/foo"` | no |
| stage | n/a | `string` | `"dev"` | no |
| subnet\_front\_end\_prefix | n/a | `string` | n/a | yes |
| subnet\_names | n/a | `list(string)` | <pre>[<br>  ""<br>]</pre> | no |
| subnet\_prefixes | n/a | `list(string)` | <pre>[<br>  ""<br>]</pre> | no |
| tags | n/a | `map(string)` | `{}` | no |
| tenant\_id | n/a | `string` | n/a | yes |
| vm\_size | n/a | `string` | `"Standard_DS2_v2"` | no |
| vnet\_cidr | n/a | `list(string)` | n/a | yes |
| vnet\_name | n/a | `string` | `"changeme"` | no |


## Outputs

No output.

EXAMPLES:
---
There is an examples folder with possible usage patterns.

`entire-infra` 


