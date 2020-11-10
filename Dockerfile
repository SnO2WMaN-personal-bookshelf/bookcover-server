FROM node:14 AS build

COPY package.json yarn.lock ./
COPY tsconfig.json tsconfig.build.json ./
COPY src ./

RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:14

ENV NODE_ENV production

COPY package.json yarn.lock ./

COPY --from=build dist ./

RUN yarn install --frozen-lockfile --production

EXPOSE 4000
CMD [ "node", "dist/main.js" ]
