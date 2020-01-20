# Do the yarn install in the full image
# web template app
FROM node:12.13.0-alpine
WORKDIR /app/deployed/webapp
COPY tsconfig.json /app/deployed
COPY ./webapp .
# RUN npm run build_ci

EXPOSE 3000

CMD ["yarn", "start"]
