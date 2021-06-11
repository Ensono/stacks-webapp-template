FROM debian:10.9

ARG TF_VERSION=0.13.7

LABEL maintainer="Amido Stacks <stacks@amido.com>"

RUN apt-get update -y \
	&& apt-get upgrade -y \
	&& apt-get install -y curl grep sed unzip git sudo jq gettext \
	# Azure CLI
	&& cd /tmp \
	&& curl -sL https://aka.ms/InstallAzureCLIDeb | bash \
	# Clean-up Apt Caches
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists

RUN cd /tmp \
	&& curl -sLO https://releases.hashicorp.com/terraform/${TF_VERSION}/terraform_${TF_VERSION}_linux_amd64.zip \
    && unzip terraform_${TF_VERSION}_linux_amd64.zip \
    && mv terraform /usr/local/bin/ \
    && terraform --version
