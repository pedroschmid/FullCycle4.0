FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

ADD . /app

CMD [ "npm", "start" ]

EXPOSE 3000