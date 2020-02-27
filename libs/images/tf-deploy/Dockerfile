# FROM hashicorp/terraform:0.12.17-buster
FROM debian:10.3

ARG TF_VERSION=0.12.17

LABEL maintainer="Amido Stacks <stacks@amido.com>"

RUN apt-get update && \
    apt-get upgrade && \
    apt-get install -y curl grep sed unzip git && \
    apt-get clean

RUN cd /tmp && \
    curl -s -LO https://releases.hashicorp.com/terraform/${TF_VERSION}/terraform_${TF_VERSION}_linux_amd64.zip && \
    unzip terraform_${TF_VERSION}_linux_amd64.zip &&\
    mv terraform /usr/local/bin/ && \
    terraform --version 

RUN cd /tmp && \
    curl -sL https://aka.ms/InstallAzureCLIDeb | bash
