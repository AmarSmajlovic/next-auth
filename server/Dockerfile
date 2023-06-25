FROM node:alpine

WORKDIR /usr/src/app/project

COPY package*.json .

RUN npm ci

COPY . .

CMD ["npm","run","start:dev"]