const { HttpLink } = require('apollo-link-http');
const { setContext } = require('apollo-link-context');
const { onError } = require('apollo-link-error');
const fetch = require('node-fetch');
const { makeRemoteExecutableSchema, introspectSchema } = require('graphql-tools');
const {
  GRAPHQL_URI,
  TENANT_KEY,
  BASE4_API_URL,
  FETCH_TIMEOUT,
} = require('../env');

const headers = {
  'x-tenant-key': TENANT_KEY,
  'x-base4-api-uri': BASE4_API_URL,
};

const httpLink = new HttpLink({
  uri: GRAPHQL_URI,
  fetch,
  headers,
  fetchOptions: { timeout: FETCH_TIMEOUT },
});

const authLink = setContext((_, previousContext) => {
  if (previousContext.graphqlContext) {
    const { authorization } = previousContext.graphqlContext;
    if (authorization) return { headers: { ...headers, authorization } };
  }
  return { headers };
});

const errorLink = onError(({ graphQLErrors, response }) => {
  if (graphQLErrors && response) response.errors = graphQLErrors.concat({ message: '' });
});

const link = authLink
  .concat(errorLink)
  .concat(httpLink);

module.exports = async () => {
  const schema = await introspectSchema(link);
  return makeRemoteExecutableSchema({ schema, link });
};
