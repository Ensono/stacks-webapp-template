FROM node:14.21.3-bullseye-slim

ARG NODE_VERSION=14.x
ARG TYPESCRIPT_VERSION=3.7.5

LABEL maintainer="Amido Stacks <stacks@amido.com>"

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y curl grep sed unzip && \
    apt-get clean

RUN npm install -g typescript@${TYPESCRIPT_VERSION} @types/node

RUN chmod -R 777 /usr/local/lib/node_modules
