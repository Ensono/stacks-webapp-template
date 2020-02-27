# FROM openjdk:8-alpine
FROM amd64/openjdk:11.0.6-slim-buster

ARG RELEASE=4.2.0.1873
ARG NODE_VERSION=12.13.0

LABEL maintainer="Amido Stacks <stacks@amido.com>"

WORKDIR /root

RUN apt-get update && \
    apt-get upgrade && \
    apt-get install -y curl grep sed unzip && \
    apt-get clean

RUN set -x && \
  curl --insecure -o ./sonarscanner.zip -L https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-$RELEASE-linux.zip && \
  unzip sonarscanner.zip && \
  rm sonarscanner.zip && \
  rm sonar-scanner-$RELEASE-linux/jre -rf && \
  # ensure Sonar uses the provided Java for musl instead of a borked glibc one
  sed -i 's/use_embedded_jre=true/use_embedded_jre=false/g' /root/sonar-scanner-$RELEASE-linux/bin/sonar-scanner && \
  ln -sf /root/sonar-scanner-$RELEASE-linux/bin/sonar-scanner /usr/local/bin

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt-get install -y nodejs

# DUMP OUT VERSIONS
# RUN nvm --version && \
RUN node -v && \
    npm -v
    # sonar-scanner -v

ENV SONAR_RUNNER_HOME=/root/sonar-scanner-$RELEASE-linux
ENV PATH $PATH:/root/sonar-scanner-$RELEASE-linux/bin

# NVM installer
CMD ["/bin/bash"]
