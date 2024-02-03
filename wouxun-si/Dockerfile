FROM node:21.5.0-slim AS node
RUN mkdir /app && chown -R node:node /app 

FROM node AS deps
USER node
WORKDIR /app
COPY --chown=node ./package-lock.json ./package-lock.json
COPY --chown=node ./package.json ./package.json
RUN npm install --frozen-lockfile

FROM node AS builder
USER node
WORKDIR /app
COPY --chown=node . .
COPY --chown=node --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM nginx:1.23.1-alpine AS release
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist ./
COPY --from=builder /app/public ./
EXPOSE 80
ENV NODE_ENV=production
ENTRYPOINT ["nginx", "-g", "daemon off;"]

