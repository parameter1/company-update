const { ApolloServer } = require('apollo-server');
const createSchema = require('./schema');
const { PORT } = require('./env');

const init = async () => {
  const schema = await createSchema();
  const server = new ApolloServer({ schema });

  server.listen({ port: PORT, path: '/graph' }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`); // eslint-disable-line no-console
  });
};

init();
