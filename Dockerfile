FROM node:16-alpine

WORKDIR /test/projectweek1

COPY package.json ./

RUN npm install typescript

RUN npm install

COPY . .

CMD npm start