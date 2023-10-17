FROM node:18


WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install
COPY . .
CMD npm start