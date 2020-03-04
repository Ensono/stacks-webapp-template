FROM ubuntu:18.04

ARG username=tfsagent

WORKDIR /opt/myagent

RUN apt-get update -y && \
    apt-get install -y curl

RUN curl -LO https://vstsagentpackage.azureedge.net/agent/2.165.0/vsts-agent-linux-x64-2.165.0.tar.gz

RUN tar zxvf vsts-agent-linux-x64-2.165.0.tar.gz

RUN rm -f vsts-agent-linux-x64-2.165.0.tar.gz

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt-get install -y nodejs

RUN ./bin/installdependencies.sh

RUN adduser --home /home/tfsagent --shell /bin/bash --disabled-password --gecos "" ${username} && \
    usermod -aG sudo ${username}

RUN chown -R ${username}:${username} /opt/myagent

RUN apt-get remove -y docker docker-engine docker.io && \
    apt-get install -y docker.io && \
    service docker start
    # sysctl docker enable 

# USER ${username}

# RUN ./config.sh
# URL: https://dev.azure.com/amido-dev

# PAT: your agent Pools REad/write PAT
# pool name: amido-stacks-local
# agent name: ${your_initial}-local-ubuntu
