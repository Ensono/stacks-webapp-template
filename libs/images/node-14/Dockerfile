FROM node:14.17.3-buster-slim

ARG TYPESCRIPT_VERSION=4.4.3

LABEL maintainer="Amido Stacks <stacks@amido.com>"

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y curl grep sed unzip && \
    apt-get clean

RUN npm install -g typescript@${TYPESCRIPT_VERSION} @types/node

RUN chmod -R 777 /usr/local/lib/node_modules
