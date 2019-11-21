const { ApolloServer } = require('apollo-server');
const createSchema = require('./schema');
const { PORT } = require('./env');
const mongodb = require('./mongodb');

const init = async () => {
  await mongodb.connect();
  const schema = await createSchema();
  const server = new ApolloServer({ schema });

  server.listen({ port: PORT, path: '/cu/graph' }).then(({ url }) => {
    process.stdout.write(`🚀  GraphQL available at ${url}\n\n`);
  });
};

init();
