FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster

# Install latest Chrome stable package
# Important: Chrome sandboxing https://github.com/GoogleChrome/lighthouse-ci/tree/master/docs/recipes/docker-client#--no-sandbox-issues-explained
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update \
    && apt-get install -y google-chrome-stable --no-install-recommends \
    && apt-get clean

WORKDIR /src
