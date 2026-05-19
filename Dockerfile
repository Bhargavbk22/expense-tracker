FROM node:20

WORKDIR /app

COPY server/package*.json ./server/

WORKDIR /app/server

RUN npm install

COPY server .

EXPOSE 5000

CMD ["npm", "start"]