FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@8.8.0

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]