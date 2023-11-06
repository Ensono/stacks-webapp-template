FROM alpine:3.13.8

LABEL maintainer="stacks@amido.com"

ARG KUBECTL_VERSION=1.20.7
ARG TF_VERSION=1.0.2

ENV GLIBC_VER=2.31-r0

# ADD AWS and add clean up
RUN apk update

RUN apk --no-cache add \
        binutils \
        curl \
        unzip \
        sudo \ 
        bash \
        groff \
        jq \
        wget \
        less

RUN curl -sL https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub -o /etc/apk/keys/sgerrand.rsa.pub \
    && curl -sLO https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VER}/glibc-${GLIBC_VER}.apk \
    && curl -sLO https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VER}/glibc-bin-${GLIBC_VER}.apk \
    && apk add --no-cache \
        glibc-${GLIBC_VER}.apk \
        glibc-bin-${GLIBC_VER}.apk \
    && curl -sL https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip -o awscliv2.zip \
    && unzip -qq awscliv2.zip \
    && aws/install \
    && rm -rf \
        awscliv2.zip \
        aws \
        /usr/local/aws-cli/v2/*/dist/aws_completer \
        /usr/local/aws-cli/v2/*/dist/awscli/data/ac.index \
        /usr/local/aws-cli/v2/*/dist/awscli/examples \
    && rm glibc-${GLIBC_VER}.apk \
    && rm glibc-bin-${GLIBC_VER}.apk \
    && rm -rf /var/cache/apk/*

# add terraform
RUN apk --no-cache del terraform

RUN cd /tmp && \
    curl -sLO https://releases.hashicorp.com/terraform/${TF_VERSION}/terraform_${TF_VERSION}_linux_amd64.zip && \
    unzip terraform_${TF_VERSION}_linux_amd64.zip &&\
    chmod +x terraform && mv terraform /usr/local/bin/ && \
    terraform --version 
# add kubectl
RUN cd /tmp && \
    curl -sLO https://storage.googleapis.com/kubernetes-release/release/v${KUBECTL_VERSION}/bin/linux/amd64/kubectl && \
    chmod +x ./kubectl && \
    mv ./kubectl /usr/local/bin/kubectl && \
    # VERIFY kubectl
    kubectl version --client

# ADD Envsubst
RUN curl -fsSL https://github.com/a8m/envsubst/releases/download/v1.2.0/envsubst-`uname -s`-`uname -m` -o /tmp/envsubst && chmod +x /tmp/envsubst && mv /tmp/envsubst /usr/local/bin

# clean up
RUN apk --no-cache del binutils
RUN rm -rf /tmp/*

CMD ["bash"]
