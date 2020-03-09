FROM amidostacks/node:0.0.3

RUN apt-get update -y && apt-get install dumb-init -y
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
COPY package*.json /tmp/
# ADD package-lock.json /tmp/package-lock.json
ADD .npmrc /tmp/.npmrc
RUN cd /tmp && npm ci --only=production
RUN rm -f /tmp/.npmrc
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# USING GLOBALLY installed typescript
RUN ln -s /usr/local/lib/node_modules/typescript /opt/app/node_modules/typescript && \
    ln -s /usr/local/lib/node_modules/@types/node /opt/app/node_modules/@types/node

# NOW SET WORKING DIRECTORY COPY APP OVER
WORKDIR /opt/app

COPY . .

RUN chown -hR node:node /opt/app

USER node

# BUILD IN CONTAINER
# project seems to not do anything
RUN node node_modules/.bin/next build && tsc --project tsconfig.server.json 

EXPOSE 3000

# DO NOT RUN APP AS ROOT
# node is a preset user in the image for user process
# BEST Practice for process management 
# App should send a SIGHUP, SIGTERM if it bounced
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# WE should not wrap with npm/pm2/supervisord etc...
# RUNNING THE COMPILED VERSION
CMD ["node", "dist/server/index.js"]
