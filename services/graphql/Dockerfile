FROM node:10.15
WORKDIR /company-update
ENV NODE_ENV production

ADD package.json yarn.lock /company-update/
ADD packages /company-update/packages
ADD services/graphql /company-update/services/graphql
RUN yarn install --production --pure-lockfile

WORKDIR /company-update/services/graphql
ENTRYPOINT [ "node", "src/index.js" ]
