FROM danlynn/ember-cli:3.13.0 as ember
WORKDIR /company-update

ADD package.json yarn.lock /company-update/
ADD packages /company-update/packages
ADD services/app /company-update/services/app
RUN yarn
WORKDIR /company-update/services/app
RUN ember build --env=production

FROM nginx:alpine
COPY --from=ember /company-update/services/app/dist /usr/share/nginx/html
COPY ./services/app/default.conf /etc/nginx/conf.d/app.conf
