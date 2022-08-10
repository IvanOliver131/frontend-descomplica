FROM node:16-slim

WORKDIR /app

# Setup a path for using local npm packages
RUN mkdir -p /opt/node_modules

COPY ./package.json /app
COPY ./package-lock.json /app

RUN yarn

COPY ./ /app

RUN yarn dev

EXPOSE 3001

CMD ["yarn", "dev"]