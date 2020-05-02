FROM node:lts-alpine AS base
RUN apk add --no-cache git
COPY ./scripts/docker/spassr-package.json /app/package.json
WORKDIR /app
RUN npm install --production

FROM node:lts-stretch-slim
COPY --from=base /app /app
WORKDIR /app
COPY ./dist ./dist
EXPOSE 5000 5005
ENTRYPOINT ["npm", "run", "serve"]
