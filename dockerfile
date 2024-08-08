# build stage
FROM node:22-alpine AS build
WORKDIR /usr/src/app
ARG TIPTAP_PRO_TOKEN \
  NEXT_PUBLIC_BASE_URL
RUN echo "@tiptap-pro:registry=https://registry.tiptap.dev/" > ~/.npmrc && \
  echo "//registry.tiptap.dev/:_authToken=${TIPTAP_PRO_TOKEN}" >> ~/.npmrc
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# prod stage
FROM node:22-alpine
WORKDIR /usr/src/app
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL \
  PORT=$PORT
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY package*.json ./
EXPOSE $PORT
ENTRYPOINT ["npm", "run", "start"]
