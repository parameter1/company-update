const { HttpLink } = require('apollo-link-http');
const { setContext } = require('apollo-link-context');
const { onError } = require('apollo-link-error');
const fetch = require('node-fetch');
const { makeRemoteExecutableSchema, introspectSchema } = require('graphql-tools');
const { GRAPHQL_URI, TENANT_KEY } = require('../env');

const headers = { 'X-Tenant-Key': TENANT_KEY };

const httpLink = new HttpLink({
  uri: GRAPHQL_URI,
  fetch,
  headers,
  fetchOptions: { timeout: 10000 },
});

const authLink = setContext((_, previousContext) => {
  if (previousContext.graphqlContext) {
    const { authorization } = previousContext.graphqlContext;
    if (authorization) return { headers: { ...headers, authorization } };
  }
  return { headers };
});

const errorLink = onError(({ graphQLErrors, response }) => {
  if (graphQLErrors) response.errors = graphQLErrors.concat({ message: '' });
});

const link = authLink
  .concat(errorLink)
  .concat(httpLink);

module.exports = async () => {
  const schema = await introspectSchema(link);
  return makeRemoteExecutableSchema({ schema, link });
};
