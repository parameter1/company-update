const { ApolloServer } = require('apollo-server');
const createSchema = require('./schema');
const mongodb = require('./mongodb');

const { log } = console;

const init = async () => {
  await mongodb.connect();
  const schema = await createSchema();
  const context = ({ req }) => ({ authorization: req.get('authorization') });
  const server = new ApolloServer({ schema, context });

  server.listen({ port: 80, path: '/graph' }).then(({ url }) => {
    log(`🚀  GraphQL available at ${url}\n\n`);
  });
};

process.on('unhandledRejection', (e) => {
  log('> Unhandled promise rejection. Throwing error...');
  throw e;
});

init();
