# build stage
FROM node:21-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build

# prod stage
FROM node:21-alpine
WORKDIR /usr/src/app
ARG PORT
ENV NODE_ENV \
  PROTOCOL \
  HOST \
  PORT
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY package*.json ./
EXPOSE ${PORT}
ENTRYPOINT ["npm", "run", "start:prod"]
