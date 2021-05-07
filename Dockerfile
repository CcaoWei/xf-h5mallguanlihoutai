FROM node:8.11-alpine

WORKDIR /app

ADD . /app

RUN npm install --production

EXPOSE 8090

CMD node ./server/app.js