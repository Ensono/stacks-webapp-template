# CSR library

Deploys and bootstraps the following components in Azure

 - Blob storage as a static website
 - CDN endpoint + TLS + DNS record 


## Providers

| Name | Version |
|------|---------|
| azurerm | ~> 2.5 |
| null | ~> 2.1 |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:-----:|
| account\_kind | n/a | `string` | `"StorageV2"` | no |
| account\_replication\_type | n/a | `string` | `"LRS"` | no |
| account\_tier | n/a | `string` | `"Standard"` | no |
| attributes | n/a | `list` | `[]` | no |
| create\_dns\_zone | Creates a DNS zone, else uses a supplied one to add records to | `bool` | n/a | yes |
| dns\_record | DNS Record value | `string` | n/a | yes |
| dns\_resource\_group | RG for the DNS Zone if adding to an existing one | `string` | `"amido-nonprod-dns"` | no |
| dns\_zone | DNS Zone value | `string` | n/a | yes |
| enabled | Enables or disables the static-website | `bool` | `true` | no |
| error\_doc | Represents the path to the error document that should be shown when an error 404 is issued, in other words, when a browser requests a page that does not exist. | `string` | `""` | no |
| index\_doc | Represents the name of the index document. This is commonly "index.html". | `string` | `"index.html"` | no |
| location\_name\_map | Each region must have corresponding a shortend name for resource naming purposes | `map(string)` | <pre>{<br>  "eastasia": "ase",<br>  "eastus": "use",<br>  "eastus2": "use2",<br>  "northeurope": "eun",<br>  "southeastasia": "asse",<br>  "uksouth": "uks",<br>  "ukwest": "ukw",<br>  "westeurope": "euw",<br>  "westus": "usw"<br>}</pre> | no |
| name\_company | n/a | `string` | n/a | yes |
| name\_component | n/a | `string` | n/a | yes |
| name\_environment | n/a | `string` | n/a | yes |
| name\_project | n/a | `string` | n/a | yes |
| resource\_group\_location | n/a | `string` | `"uksouth"` | no |
| resource\_namer | n/a | `string` | n/a | yes |
| resource\_tags | n/a | `map(string)` | `{}` | no |
| stage | n/a | `string` | `"dev"` | no |
| subscription\_id | ########################################### AUTHENTICATION ########################################### | `any` | n/a | yes |
| tags | n/a | `map(string)` | `{}` | no |

## Outputs

| Name | Description |
|------|-------------|
| cdn\_endpoint | CDN endpoint hostname |
| dns\_name | Dns FQDN for website |
| resource\_group\_name | Resource Group name created to host the SPA resources |
| storage\_account\_key | Blob Storage Access Key |
| storage\_account\_name | Storage Account name |
| storage\_endpoint | Blob Storage Static website endpoint |
