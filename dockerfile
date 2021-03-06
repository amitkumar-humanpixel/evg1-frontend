FROM node:latest
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build-dev
EXPOSE 8080
CMD npm run dev
