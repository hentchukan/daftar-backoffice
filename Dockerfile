FROM node:latest as build-stage
ARG VUE_APP_BASE_URL
ENV VUE_APP_BASE_URL=$VUE_APP_BASE_URL
ARG VUE_APP_FRONT_URL
ENV VUE_APP_FRONT_URL=$VUE_APP_FRONT_URL
ARG VUE_APP_AUTH_URL
ENV VUE_APP_AUTH_URL=https://keycloak-787224299904.europe-west1.run.app

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /app/dist .
COPY nginx.conf /etc/nginx/nginx.conf