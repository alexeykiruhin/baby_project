FROM node:18-alpine

WORKDIR /client

COPY package.json /client

RUN npm install

COPY . /client/

CMD ["npm", "start"]
