FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

CMD ["npm", "run", "start:dev"]
# CDM ["node",".\dist\src\main.js"]