FROM node:16.13.1-alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/server
RUN mkdir -p /usr/src/app/client

WORKDIR /usr/src/app/server

COPY ./server/package*.json ./

RUN npm install

COPY ./server/ ./

WORKDIR /usr/src/app/client

COPY ./client/package*.json ./

RUN npm install

COPY ./client/ ./

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm run build

EXPOSE 8080

WORKDIR /usr/src/app/server

CMD ["node", "./dist/index.js"]
