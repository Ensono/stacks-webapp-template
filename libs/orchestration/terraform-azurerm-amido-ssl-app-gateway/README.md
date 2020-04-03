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
docker: $ chmod +x /usr/data/aux_scripts/certbot.sh && cd aux_scripts
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

Continue...

this will then create a certs directory which you can then place 

