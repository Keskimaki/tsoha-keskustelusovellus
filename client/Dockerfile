FROM node:alpine

EXPOSE 3000

WORKDIR /usr/src/app

COPY package* ./

RUN npm install

COPY . .

CMD npm start
