FROM debian:10.3

ARG KUBECTL_VERSION=1.15.1
ARG KUSTOMIZE_VERSION=3.5.4
ARG TYPESCRIPT_VERSION=3.7.5

LABEL maintainer="Amido Stacks <stacks@amido.com>"
LABEL "com.azure.dev.pipelines.agent.handler.node.path"="/usr/bin/node"

RUN apt-get update && \
    apt-get upgrade && \
    apt-get install -y curl grep sed unzip git && \
    apt-get clean

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

RUN cd /tmp && \
    curl -sL https://aka.ms/InstallAzureCLIDeb | bash

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt-get install -y nodejs && \
    node -v && \
    npm -v

RUN npm install -g typescript@${TYPESCRIPT_VERSION}
