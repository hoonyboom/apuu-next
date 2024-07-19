# build stage
FROM node:21-alpine AS build
WORKDIR /usr/src/app
ARG TIPTAP_PRO_TOKEN
ENV TIPTAP_PRO_TOKEN=${TIPTAP_PRO_TOKEN}
RUN echo "@tiptap-pro:registry=https://registry.tiptap.dev/" > ~/.npmrc && \
  echo "//registry.tiptap.dev/:_authToken=${TIPTAP_PRO_TOKEN}" >> ~/.npmrc
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# prod stage
FROM node:21-alpine
WORKDIR /usr/src/app
ARG NEXT_PUBLIC_BASE_URL \
  NEXT_PUBLIC_COLLAB_DOC_PREFIX \
  NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID \
  TIPTAP_COLLAB_SECRET \
  NODE_ENV \
  PORT \ 
  SKIP_ENV_VALIDATION
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL \
  NEXT_PUBLIC_COLLAB_DOC_PREFIX=$NEXT_PUBLIC_COLLAB_DOC_PREFIX \
  NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID=$NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID \
  TIPTAP_COLLAB_SECRET=$TIPTAP_COLLAB_SECRET \
  NODE_ENV=$NODE_ENV \
  PORT=$PORT 
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY package*.json ./
EXPOSE $PORT
ENTRYPOINT ["npm", "run", "start:prod"]
