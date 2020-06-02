FROM amidostacks/node:0.0.3

ARG NODE_ENV=production
ARG APP_BASE_PATH=""
ARG NEXT_PUBLIC_CONTENTFUL_SPACE_ID=""
ARG NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=""
ARG NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN=""

ENV NODE_ENV=${NODE_ENV}
ENV APP_BASE_PATH=${APP_BASE_PATH}
ENV NEXT_PUBLIC_CONTENTFUL_SPACE_ID=${NEXT_PUBLIC_CONTENTFUL_SPACE_ID} 
ENV NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=${NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}
ENV NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN=${NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN}

RUN echo ${APP_BASE_PATH}

RUN apt-get update -y && apt-get install dumb-init -y
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
COPY package*.json /tmp/
RUN cd /tmp && npm ci --only=production
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# USING GLOBALLY installed typescript
# NB: if you are using an image which doesn't have TS installed globally change this
RUN ln -s /usr/local/lib/node_modules/typescript /opt/app/node_modules/typescript && \
    ln -s /usr/local/lib/node_modules/@types/node /opt/app/node_modules/@types/node

# NOW SET WORKING DIRECTORY COPY APP OVER
WORKDIR /opt/app

COPY . .

RUN chown -hR node:node /opt/app

USER node

# BUILD IN CONTAINER
# project seems to not do anything
RUN tsc --project tsconfig.server.json && \
    node node_modules/.bin/next build

EXPOSE 3000

# DO NOT RUN APP AS ROOT
# node is a preset user in the image for user process
# BEST Practice for process management 
# App should send a SIGHUP, SIGTERM if it bounced
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# WE should not wrap with npm/pm2/supervisord etc...
# RUNNING THE COMPILED VERSION
CMD ["node", "dist/server/index.js"]
