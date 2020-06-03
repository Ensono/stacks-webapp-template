FROM amidostacks/node:0.0.3

RUN apt-get update -y && apt-get install dumb-init -y

# Install latest chrome stable package.
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update \
    && apt-get install -y google-chrome-stable --no-install-recommends \
    && apt-get clean

COPY package*.json /tmp/
RUN cd /tmp && npm install
RUN mkdir -p /opt/lhci && cp -a /tmp/node_modules /opt/lhci/

WORKDIR /opt/lhci

COPY *.json ./

RUN chown -hR node:node /opt/lhci

USER node
