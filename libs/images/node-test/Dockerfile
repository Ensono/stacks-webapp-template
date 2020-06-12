FROM amidostacks/node:0.0.3

RUN apt-get update -y && apt-get install dumb-init -y

# Install latest Chrome stable package
# Important: Chrome sandboxing https://github.com/GoogleChrome/lighthouse-ci/tree/master/docs/recipes/docker-client#--no-sandbox-issues-explained
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update \
    && apt-get install -y google-chrome-stable --no-install-recommends \
    && apt-get clean

RUN cd /tmp && npm install -g @lhci/cli@0.4.1
RUN mkdir -p /opt/lhci && \
  cp -a /usr/local/bin/lhci /opt/lhci/

WORKDIR /opt/lhci
