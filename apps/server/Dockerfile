FROM node:16
WORKDIR /app
COPY package.json .
RUN npm ci
COPY . .
RUN npm run build
CMD node dist/index.js