# SSL APP GATEWAY

DESCRIPTION:
---



PRE_REQUISITES:
---
NB: Because AzureDNS is not a supported LetsEncrypt plugin to authenticate an SSL certificate
As such you must first run the infrastructure once with a sample selfsigned cert included in the repo

Once complete please run the cert creation process for your domain:
```
cd $CreatedProjectDir/aux_scripts
$ docker run -v $(pwd):/usr/data --rm -it amidostacks/ci-tf:0.0.2 /bin/bash
docker: $ chmod +x /usr/data/aux_scripts/certbot.sh && cd /usr/data/aux_scripts
docker: $ ./certbot.sh your.domain.com email@domain.com pfxPassword1 # password is optional if ommitted will default to Password1
``` 
Use only the subdomain as is - the script will add the wildcard so your certificate is valid for all values in that subdomain

PS: ensure your directory you bind to on container is as per above `/usr/data`

Follow the onscreen instructions as this process has to be manual for `AzureDNS` 
Ensure your Azure created subdomain NS records have been correctly referenced by the APEX domain registrar (speak to your network admins to ensure this is the case if you are not able to do this yourself) 

Create the TXT record as instructed

```bash
$ dig TXT _acme-challenge.nonprod.amidostacks.com
```
If all successful


## Providers

| Name | Version |
|------|---------|
| azurerm | n/a |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:-----:|
| aks\_ingress\_private\_ip | n/a | `string` | n/a | yes |
| aks\_ingress\_public\_ip | n/a | `string` | n/a | yes |
| aks\_resource\_group | n/a | `string` | n/a | yes |
| attributes | n/a | `list` | `[]` | no |
| create\_ssl\_cert | ########################## CONDITIONAL SETTINGS ######################### | `bool` | `true` | no |
| dns\_zone | ########################### # DNS SETTINGS ########################## | `string` | `""` | no |
| pfx\_password | n/a | `string` | `"Password1"` | no |
| resource\_group\_location | n/a | `string` | `"uksouth"` | no |
| resource\_group\_name | n/a | `string` | n/a | yes |
| resource\_group\_tags | n/a | `map(string)` | `{}` | no |
| resource\_namer | n/a | `string` | `"genericname"` | no |
| stage | n/a | `string` | `"dev"` | no |
| subnet\_backend\_end\_prefix | n/a | `string` | n/a | yes |
| subnet\_front\_end\_prefix | n/a | `string` | n/a | yes |
| subnet\_names | n/a | `list(string)` | <pre>[<br>  ""<br>]</pre> | no |
| subnet\_prefixes | n/a | `list(string)` | <pre>[<br>  ""<br>]</pre> | no |
| tags | n/a | `map(string)` | `{}` | no |
| vnet\_cidr | n/a | `list(string)` | n/a | yes |
| vnet\_name | n/a | `string` | `"changeme"` | no |

## Outputs

No output.
