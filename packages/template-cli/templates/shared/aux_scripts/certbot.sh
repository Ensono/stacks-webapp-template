#!/bin/bash
domain="$1"
email="$2"
pfx_password="$3"

# INSTALLATION 
apt-get install -y sudo openssl
cbot=$(which certbot)
if [ -z "$cbot" ]; then 
  sudo apt-get install -y certbot
fi

sudo certbot certonly -d "*.$domain,$domain" --email $email --agree-tos --manual --manual-public-ip-logging-ok

mkdir -p /usr/data/certs

cat /usr/data/certs/$domain/cert.pem /usr/data/certs/$domain/privkey.pem > /usr/data/certs/$domain.pem

if [ -z "$pfx_password" ]; then
  pfx_password="Password1"
fi;

openssl pkcs12 -export -in /usr/data/certs/$domain.pem -password pass:$pfx_password -name $domain -out /usr/data/certs/$domain.pfx

cp -rL --remove-destination /etc/letsencrypt/live/$domain /usr/data/certs/

exit 0

# ./certbot.sh nonprod.amidostacks.com stacks@amido.com
