FROM node:14.15.4

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json /usr/app
RUN npm install
COPY . /usr/app