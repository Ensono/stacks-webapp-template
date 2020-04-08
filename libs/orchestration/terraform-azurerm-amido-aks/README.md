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

| Name | Version |
|------|---------|
| azurerm | n/a |
| tls | n/a |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:-----:|
| acr\_registry\_name | ACR name | `string` | `"myacrregistry"` | no |
| admin\_username | n/a | `string` | `"ubuntu"` | no |
| advanced\_networking\_enabled | n/a | `bool` | `true` | no |
| aks\_ingress\_private\_ip | n/a | `string` | n/a | yes |
| attributes | Additional attributes for tagging | `list` | `[]` | no |
| cluster\_name | Name for the cluster | `string` | `"akscluster"` | no |
| cluster\_version | Specify AKS cluster version - please refer to MS for latest updates on the available versions. NB: opt for stable versions where possible | `string` | `"1.15.7"` | no |
| create\_acr | whether to create a ACR | `bool` | `true` | no |
| create\_aks | Whether KAS gets created | `bool` | `true` | no |
| create\_aksvnet | Whether to create an AKS VNET specifically or use an existing one - if false you must supply an existing VNET name and a vnet\_cidr for subnets | `bool` | `true` | no |
| create\_dns\_zone | whether to create a DNS zone | `bool` | `true` | no |
| create\_ssh\_key | n/a | `bool` | `true` | no |
| create\_user\_identiy | Creates a User Managed Identity - which can be used subsquently with AAD pod identity extensions | `bool` | `true` | no |
| dns\_prefix | n/a | `string` | `"aks"` | no |
| dns\_zone | Dns zone name - e.g. nonprod.domain.com, you should avoid using an APEX zone | `string` | `""` | no |
| enable\_auto\_scaling | n/a | `bool` | `false` | no |
| internal\_dns\_zone | Internal DNS zone name - e.g. nonprod.domain.internal | `string` | `""` | no |
| log\_application\_type | n/a | `string` | `"other"` | no |
| max\_nodes | n/a | `number` | `10` | no |
| max\_pods | n/a | `number` | `100` | no |
| min\_nodes | n/a | `number` | `1` | no |
| name\_company | Company Name - should/will be used in conventional resource naming | `string` | n/a | yes |
| name\_component | Component Name - should/will be used in conventional resource naming. Typically this will be a logical name for this part of the system i.e. `API` \|\| `middleware` or more generic like `Billing` | `string` | n/a | yes |
| name\_environment | n/a | `string` | n/a | yes |
| name\_project | Project Name - should/will be used in conventional resource naming | `string` | n/a | yes |
| node\_count | n/a | `number` | `0` | no |
| nodepool\_type | n/a | `string` | `"VirtualMachineScaleSets"` | no |
| oms\_ws\_list\_of\_one | n/a | `list(map(string))` | <pre>[<br>  {}<br>]</pre> | no |
| os\_disk\_size | DEFAULTS TO 30 if not overwritten | `number` | `30` | no |
| registry\_admin\_enabled | Whether ACR admin is enabled | `bool` | `true` | no |
| registry\_sku | ACR SKU | `string` | `"Standard"` | no |
| resource\_group\_location | Location of the RG | `string` | `"uksouth"` | no |
| resource\_group\_tags | Tags at a RG level | `map(string)` | `{}` | no |
| resource\_namer | This should be a uniformly created string - ideally using something like cloudposse label module to ensure conventions on naming are followed throughout organization. this value is used in all the places within the module to name resources - additionally it changes the string to ensure it conforms to Azure standards where appropriate - i.e. blob/KV/ACR names are stripped of non alphanumeric characters and in some cases strings are sliced to conform to max char length | `string` | `"genericname"` | no |
| retention\_in\_days | n/a | `number` | `30` | no |
| spn\_object\_id | n/a | `string` | n/a | yes |
| stage | n/a | `string` | `"dev"` | no |
| subnet\_front\_end\_prefix | Prefix for front end subnet - should be in the form of x.x.x.x/x | `string` | n/a | yes |
| subnet\_names | Names for subnets | `list(string)` | <pre>[<br>  ""<br>]</pre> | no |
| subnet\_prefixes | Prefix for subnet - should be in the form of x.x.x.x/x | `list(string)` | <pre>[<br>  ""<br>]</pre> | no |
| tags | Tags to be assigned to all resources, NB if global tagging is enabled these will get overwritten periodically | `map(string)` | `{}` | no |
| tenant\_id | n/a | `string` | n/a | yes |
| vm\_size | n/a | `string` | `"Standard_DS2_v2"` | no |
| vnet\_cidr | CIDR block notation for VNET | `list(string)` | n/a | yes |
| vnet\_name | VNET name if create\_aks\_vnet is false | `string` | `"changeme"` | no |

## Outputs

| Name | Description |
|------|-------------|
| aks\_default\_user\_identity\_client\_id | n/a |
| aks\_default\_user\_identity\_id | n/a |
| aks\_default\_user\_identity\_name | ######################################## ############ Identity ################## ## used for AAD Pod identity binding ### ######################################## |
| aks\_ingress\_private\_ip | n/a |
| aks\_ingress\_public\_ip | n/a |
| aks\_node\_resource\_group | n/a |
| aks\_system\_identity\_principal\_id | #########azurerm\_kubernetes\_cluster.default.identity.principal\_id |
| resource\_group\_id | Created resource group Id |
| resource\_group\_name | Created resource group Name |
| vnet\_address\_id | Specified VNET Id |
| vnet\_address\_space | Specified VNET address space |
| vnet\_name | Created VNET name.<br>Name can be deduced however it's better to create a direct dependency |

EXAMPLES:
---
There is an examples folder with possible usage patterns.

`entire-infra` 


