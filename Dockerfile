FROM node:20

WORKDIR /app

COPY server/package*.json ./server/
COPY client/package*.json ./client/

RUN cd server && npm install
RUN cd client && npm install

COPY . .

RUN cd client && npm run build

EXPOSE 5000

WORKDIR /app/server

CMD ["npm", "start"]