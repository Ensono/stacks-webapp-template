FROM debian:buster-20210408

ARG TF_VERSION=0.13.1

LABEL maintainer="Amido Stacks <stacks@amido.com>"

RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install -y curl grep sed unzip git sudo jq gettext
RUN apt-get clean

RUN cd /tmp && \
    curl -sLO https://releases.hashicorp.com/terraform/${TF_VERSION}/terraform_${TF_VERSION}_linux_amd64.zip && \
    unzip terraform_${TF_VERSION}_linux_amd64.zip &&\
    mv terraform /usr/local/bin/ && \
    terraform --version 

RUN cd /tmp && \
    curl -sL https://aka.ms/InstallAzureCLIDeb | bash
