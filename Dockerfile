# syntax=docker/dockerfile:1.4
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000
ENV NODE_ENV=production

WORKDIR /src

FROM base as build

# 👇 increase heap for install/build only
ENV NODE_OPTIONS=--max-old-space-size=4096

COPY --link package.json package-lock.json .
RUN npm install --production=false

COPY --link . .

RUN npm run build
RUN npm prune

FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output

CMD [ "node", ".output/server/index.mjs" ]
