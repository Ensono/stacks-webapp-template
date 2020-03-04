FROM node:12-buster

RUN apt-get update -y && apt-get install dumb-init -y
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
ADD .npmrc /tmp/.npmrc
RUN cd /tmp && npm install
# RUN cd /tmp && npm ci --only=prod
RUN rm -f .npmrc
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# NOW SET WORKING DIRECTORY COPY APP OVER
WORKDIR /opt/app

COPY . .

RUN chown -hR node:node /opt/app

USER node

# BUILD IN CONTAINER
RUN node node_modules/.bin/next build

EXPOSE 3000

# DO NOT RUN APP AS ROOT
# node is a preset user in the image for user process
# BEST Practice for process management 
# App should send a SIGHUP, SIGTERM if it bounced
ENTRYPOINT ["/usr/bin/dumb-init", "--"]


# WE should not wrap with npm/pm2/supervisord etc...
# RUNNING THE COMPILED VERSION
CMD ["node", "dist/server/index.js"]
