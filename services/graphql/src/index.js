const { ApolloServer } = require('apollo-server');
const createSchema = require('./schema');
const mongodb = require('./mongodb');
const { PORT, EXPOSED_PORT } = require('./env');

const { log } = console;

const init = async () => {
  await mongodb.connect();
  const schema = await createSchema();
  const context = ({ req }) => ({ req, authorization: req.get('authorization') });
  const server = new ApolloServer({ schema, context });

  server.listen({ port: PORT, path: '/graph' }).then(() => {
    log(`🚀  GraphQL available at http://localhost:${EXPOSED_PORT}/graphql\n\n`);
  });
};

process.on('unhandledRejection', (e) => {
  log('> Unhandled promise rejection. Throwing error...');
  throw e;
});

init();
