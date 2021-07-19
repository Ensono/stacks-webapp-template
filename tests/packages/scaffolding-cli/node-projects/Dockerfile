FROM amidostacks/node-14:0.0.1

ARG VERSION="latest"
ARG PROJECT_WORKDIR=""
ARG CONFIG_FILENAME="*.bootstrap-config.json"

RUN cd /tmp && npm install -g @amidostacks/scaffolding-cli@${VERSION}
RUN mkdir -p /opt/cli && \
  cp -a /usr/local/bin/amido-scaffolding-cli /opt/cli/

WORKDIR /opt/cli

COPY ${CONFIG_FILENAME} .

# Boostrap the project from config file and install dependencies
RUN amido-scaffolding-cli run -c ${CONFIG_FILENAME} && \
    cd /opt/cli/${PROJECT_WORKDIR} && \
    npm install

WORKDIR /opt/cli/${PROJECT_WORKDIR}
