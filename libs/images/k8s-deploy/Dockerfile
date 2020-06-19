FROM debian:10.3

ARG KUBECTL_VERSION=1.16.10
ARG KUSTOMIZE_VERSION=3.5.4
ARG TYPESCRIPT_VERSION=3.7.5
ARG DOTNET_CORE_VERSION=3.1

LABEL maintainer="Amido Stacks <stacks@amido.com>"
LABEL "com.azure.dev.pipelines.agent.handler.node.path"="/usr/bin/node"

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y curl grep sed unzip git wget sudo && \
    apt-get clean -y

# RUN apt-get update -y
# RUN apt-get upgrade -y
# RUN apt-get install -y curl grep sed unzip git wget sudo
# RUN apt-get clean

# INSTALL KUBECTL
RUN cd /tmp && \
    curl -LO https://storage.googleapis.com/kubernetes-release/release/v${KUBECTL_VERSION}/bin/linux/amd64/kubectl && \
    chmod +x ./kubectl && \
    mv ./kubectl /usr/local/bin/kubectl && \
    # VERIFY kubectl
    kubectl version --client

# INSTALL KUSTOMIZE
RUN cd /tmp && \
    curl -s -LO https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize/v${KUSTOMIZE_VERSION}/kustomize_v${KUSTOMIZE_VERSION}_linux_amd64.tar.gz && \
    tar xzf ./kustomize_v*_amd64.tar.gz && \
    mv ./kustomize /usr/local/bin/kustomize && \
    kustomize version && \
    rm -f kustomize_v*_amd64.tar.gz 

#Install Azure CLI
RUN cd /tmp && \
    curl -sL https://aka.ms/InstallAzureCLIDeb | bash

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt-get install -y nodejs && \
    node -v && \
    npm -v

RUN npm install -g typescript@${TYPESCRIPT_VERSION}

# DOTNET CORE env
RUN wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.asc.gpg && \
    mv microsoft.asc.gpg /etc/apt/trusted.gpg.d/ && \
    wget -q https://packages.microsoft.com/config/debian/10/prod.list && \
    mv prod.list /etc/apt/sources.list.d/microsoft-prod.list && \
    chown root:root /etc/apt/trusted.gpg.d/microsoft.asc.gpg && \
    chown root:root /etc/apt/sources.list.d/microsoft-prod.list

# DOTNET SDK, runtime
RUN apt-get install -y apt-transport-https && \
    apt-get update -y && \
    apt-get install -y dotnet-sdk-${DOTNET_CORE_VERSION} && \
    apt-get install -y aspnetcore-runtime-${DOTNET_CORE_VERSION}

# Install GCLOUD CLI
# Add the Cloud SDK distribution URI as a package source
RUN echo "deb http://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

# Import the Google Cloud Platform public key
RUN curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -

# Update the package list and install the Cloud SDK
RUN apt-get update -y && apt-get install -y google-cloud-sdk

RUN curl -fsSL "https://github.com/GoogleCloudPlatform/docker-credential-gcr/releases/download/v2.0.1/docker-credential-gcr_linux_amd64-2.0.1.tar.gz" \ 
| tar xz --to-stdout /opt/docker-credential-gcr \
| tee /usr/local/bin/docker-credential-gcr > /dev/null && chmod 0777 /usr/local/bin/docker-credential-gcr

# ENVSUBST with built in checks
RUN curl -fsSL https://github.com/amido/stacks-webapp-template/releases/download/0.0.2/envsubst-`uname -s`-`uname -m` -o /opt/envsubst && \
  chmod +x /opt/envsubst && \
  mv /opt/envsubst /usr/local/bin

RUN apt-get install -y \
    apt-transport-https \
    ca-certificates \
    gnupg-agent \
    software-properties-common 

RUN curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add - && \
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"

RUN apt-get update -y && \
    apt-get install -y docker-ce-cli

