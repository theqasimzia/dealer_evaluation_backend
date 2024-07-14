FROM node:18.12.1-bullseye-slim

RUN npm install -g npm@9.1.3

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
