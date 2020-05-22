FROM node:10

WORKDIR /usr/src/app

COPY ./yarn.lock ./yarn.lock
COPY ./package.json ./package.json

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 443

CMD [ "node", "dist/index.js" ]
