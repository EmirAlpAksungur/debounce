FROM node:22-alpine

RUN apk update && apk add bash curl

WORKDIR /backend

COPY ./backend ./ 

RUN npm install

RUN chmod +x /backend/wait-for-elasticsearch.sh

CMD ["/backend/wait-for-elasticsearch.sh", "node", "index.js"]