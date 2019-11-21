const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('../definitions');
const resolvers = require('../resolvers');

module.exports = async () => makeExecutableSchema({ typeDefs, resolvers });
