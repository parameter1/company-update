# Company Update Form
This repository contains the GraphQL backend, Ember frontend, and docker/compose scripts for a development environment.

## Requirements
This project requires [Docker Compose](https://docs.docker.com/compose/overview/) to develop and test. The [Yarn](https://yarnpkg.com) package manager is also required, and is used instead of `npm`.

## Runnning
1. Clone repository
2. Override any applicable development environment variables (see [Environment Variables](#environment-variables) below)
3. In the project root, run `yarn start`. Also available:
  - `yarn stop` (graceful shutdown/cleanup)
  - `yarn kill` (remove all local data)
  - `yarn terminal:app` Interactive terminal within the Ember `app` container
  - `yarn terminal:graph` Interactive terminal within the GraphQL `graph` container
4. The application is now accessible on `localhost:9905` (or whatever port you configure)

## Interactive Terminal
You can load an interactive terminal for the relevant container via `yarn terminal:app` or `yarn terminal:graph`. This will allow you to add, remove, or upgrade project dependencies using Yarn (among other things). Note: _the application instances must be running via `yarn start` for the terminal to load._

## Environment Variables
Application configuration is *not* under version control, and must be injected as environment variables. The envalid library is used to ensure the required variables have been set.
1. Create a `.env` file in the project root
2. Set (or change) values for the following variables:
```ini
EMBER_SERVE_PORT=9905
EMBER_LIVER_PORT=9906
EMBER_TESTS_PORT=9907

GRAPH_APP_PORT=9900
GRAPH_DB_PORT=9901

B4GRAPH_URI=some-url
B4GRAPH_API_KEY=some-api-key
B4GRAPH_TENANT_KEY=some-account-group

PLATFORM_URI=https://some.domain
PLATFORM_LOGO=https://cdn.some.domain/some/path/to/some.img
NOTIFICATION_TO=developer@southcomm.com

SENDGRID_FROM=root@localhost
SENDGRID_API_KEY=some-api-key

DEBUG=express:*
MONGOOSE_DEBUG=1
```

*Note:* You **must** specify a valid Base4Graph URI and Api Key to use this application.

### Production Environment Variables
The following environment variables must be set at run-time for the production deployment of this application. The development and test environments set appropriate values for those environments within the `docker-compose.yml` configuration files.

```ini
# Must be configured per instance
B4GRAPH_URI=
B4GRAPH_API_KEY=
B4GRAPH_TENANT_KEY=
PLATFORM_URI=
PLATFORM_LOGO=
NOTIFICATION_TO=
SENDGRID_API_KEY=
```
