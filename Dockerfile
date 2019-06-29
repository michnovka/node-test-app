ARG NODE_ENV=development

# The instructions for the first stage
FROM node:10-alpine as builder

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./

RUN apk add --no-cache --virtual \
    .gyp \
    python \
    make \
    g++ \
&& npm install --production

# The instructions for second stage
FROM node:10-alpine

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

# Create app directory
WORKDIR /usr/src/app

COPY --from=builder node_modules node_modules
COPY . .

EXPOSE 3000
ENTRYPOINT [ "npm" ]
CMD [ "start" ]
