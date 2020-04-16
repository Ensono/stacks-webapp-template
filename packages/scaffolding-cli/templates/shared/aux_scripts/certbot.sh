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

sudo certbot certonly -d "*.$domain,$domain" --email $email --agree-tos --preferred-challenges=dns --manual --manual-public-ip-logging-ok

mkdir -p /usr/data/certs

cat /etc/letsencrypt/live/$domain/cert.pem /etc/letsencrypt/live/$domain/privkey.pem > /usr/data/deploy/azure/certs/$domain.pem

if [ -z "$pfx_password" ]; then
  pfx_password="Password1"
fi;

openssl pkcs12 -export -in /usr/data/deploy/azure/certs/$domain.pem -password pass:$pfx_password -name $domain -out /usr/data/deploy/azure/certs/$domain.pfx

exit 0

# ./certbot.sh demo.nonprod.amidostacks.com stacks@amido.com
