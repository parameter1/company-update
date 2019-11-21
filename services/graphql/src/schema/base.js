const { HttpLink } = require('apollo-link-http');
const { setContext } = require('apollo-link-context');
const { onError } = require('apollo-link-error');
const fetch = require('node-fetch');
const {
  makeRemoteExecutableSchema,
  introspectSchema,
  transformSchema,
  RenameTypes,
  RenameRootFields,
} = require('graphql-tools');
const {
  B4GRAPH_URI,
  B4GRAPH_API_KEY,
  B4GRAPH_TENANT_KEY,
} = require('../env');

const headers = {
  Authorization: `Bearer ${B4GRAPH_API_KEY}`,
  'X-Tenant-Key': B4GRAPH_TENANT_KEY,
};

const httpLink = new HttpLink({
  uri: B4GRAPH_URI,
  fetch,
  headers,
  fetchOptions: { timeout: 1000 },
});
const errorLink = onError((e) => {
  console.warn('\nError in remote schema call!\n', e); // eslint-disable-line no-console
  if (e.networkError) throw e.networkError;
  if (e.graphQLErrors && e.graphQLErrors[0]) throw e.graphQLErrors[0];
});

const link = setContext(() => headers).concat(errorLink).concat(httpLink);
const rename = name => `base4${name.charAt(0).toUpperCase()}${name.slice(1)}`;

module.exports = async () => {
  const schema = await introspectSchema(link);
  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link,
  });
  const transformedSchema = transformSchema(executableSchema, [
    new RenameTypes(name => `Base4${name}`),
    new RenameRootFields((op, name) => rename(name)),
  ]);
  return transformedSchema;
};
