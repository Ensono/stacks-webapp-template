FROM azul/zulu-openjdk-debian:11.0.12-11.50.19

RUN apt-get update \
  && apt-get install -y chromium wget unzip \
  && apt-get clean -y \
  && wget https://chromedriver.storage.googleapis.com/83.0.4103.39/chromedriver_linux64.zip \
  && unzip chromedriver_linux64.zip \
  && mv chromedriver /usr/local/bin \
  && rm chromedriver_linux64.zip
