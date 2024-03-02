FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY . .

RUN npm ci

CMD ["npm", "run", "start:dev"]