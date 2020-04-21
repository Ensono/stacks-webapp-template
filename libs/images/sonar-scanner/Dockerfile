# FROM openjdk:8-alpine
FROM amd64/openjdk:11.0.6-slim-buster

ARG RELEASE=4.2.0.1873
ARG NODE_VERSION=12.13.0
ARG DOTNET_CORE_VERSION=3.1
ARG DOTNET_SONARSCANNER_VERSION=4.8.0

LABEL maintainer="Amido Stacks <stacks@amido.com>"
# this little nuget tells TFS that I have a version of node installed and I want to use it
LABEL "com.azure.dev.pipelines.agent.handler.node.path"="/usr/bin/node"

WORKDIR /opt

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y curl grep sed unzip wget&& \
    apt-get clean

RUN set -x && \
  curl --insecure -o ./sonarscanner.zip -L https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-$RELEASE-linux.zip && \
  unzip sonarscanner.zip && \
  rm sonarscanner.zip && \
  rm sonar-scanner-$RELEASE-linux/jre -rf && \
  # ensure Sonar uses the provided Java for musl instead of a borked glibc one
  sed -i 's/use_embedded_jre=true/use_embedded_jre=false/g' /opt/sonar-scanner-$RELEASE-linux/bin/sonar-scanner && \
  chmod -R 777 /opt && \
  ln -sf /opt/sonar-scanner-$RELEASE-linux/bin/sonar-scanner /usr/local/bin && \
  chmod 777 /usr/local/bin/sonar-scanner

# specify a version
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt-get install -y nodejs

# DUMP OUT VERSIONS
RUN node -v && \
    npm -v

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

RUN dotnet tool install --tool-path /opt/.dotnet/tools dotnet-sonarscanner --version ${DOTNET_SONARSCANNER_VERSION}
RUN chmod -R 777 /opt

ENV SONAR_RUNNER_HOME=/opt/sonar-scanner-$RELEASE-linux
ENV PATH $PATH:/opt/sonar-scanner-$RELEASE-linux/bin:/opt/.dotnet/tools
