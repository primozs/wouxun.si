FROM node:21.5.0-slim AS node
RUN mkdir /app && chown -R node:node /app 

FROM node AS deps
USER node
WORKDIR /app
COPY --chown=node ./package-lock.json ./package-lock.json
COPY --chown=node ./package.json ./package.json
RUN npm install --frozen-lockfile

FROM node AS proddeps
USER node
WORKDIR /app
COPY --chown=node ./package-lock.json ./package-lock.json
COPY --chown=node ./package.json ./package.json
RUN npm install --frozen-lockfile --production --omit=dev

FROM node AS builder
USER node
WORKDIR /app
COPY --chown=node . .
COPY --chown=node --from=deps /app/node_modules ./node_modules
COPY --chown=node ./.env.local ./.env
RUN npm run build

FROM node AS release
USER node
WORKDIR /app
ENV NODE_ENV production
ENV ORIGIN https://susa.cloud
COPY --chown=node --from=builder /app/dist ./dist
COPY --chown=node --from=builder /app/public ./public
COPY --chown=node --from=builder /app/server ./server
COPY --chown=node --from=builder /app/package.json ./package.json
COPY --chown=node --from=proddeps /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "server/entry.fastify.js"]
