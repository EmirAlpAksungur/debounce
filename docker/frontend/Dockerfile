FROM node:22-alpine

RUN apk update && apk add bash

WORKDIR /frontend

COPY ./frontend .

RUN npm install --legacy-peer-deps
RUN npm run build

WORKDIR /frontend/build

CMD ["npx","serve","-s"]