# Do the yarn install in the full image
# web template app
FROM node:12.13.0-alpine
WORKDIR /app/deployed/webapp
COPY tsconfig.json /app/deployed
COPY ./webapp .
RUN yarn
RUN yarn build
# not required at the moment
# RUN npm install pm2 -g

EXPOSE 3000

CMD ["yarn", "start"]
