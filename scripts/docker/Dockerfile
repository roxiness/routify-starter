FROM node:lts-alpine
RUN apk add --no-cache git
WORKDIR /app
RUN npm install spassr
COPY ./dist ./dist
EXPOSE 5000 5005
ENTRYPOINT ["npx", "spassr", "--serve-spa", "--serve-ssr"]
