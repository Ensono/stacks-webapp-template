# Do the npm install in the full image
# web template app
FROM node:12.13.0-alpine
WORKDIR /app/deployed/webapp
COPY . .

EXPOSE 3000

CMD ["npm run", "start"]
