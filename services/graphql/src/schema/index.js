const { mergeSchemas } = require('graphql-tools');
const createBaseSchema = require('./base');
const createLocalSchema = require('./local');
const { GRAPHQL_URI } = require('../env');

module.exports = async () => {
  const localSchema = await createLocalSchema();
  const baseSchema = await createBaseSchema();
  const linkTypeDefs = `
    extend type CompanyUpdateSubmission {
      company: ContentCompany!
    }
  `;
  process.stdout.write(`🌐  Remote schema retrieved from ${GRAPHQL_URI}.\n`);

  return mergeSchemas({
    schemas: [
      localSchema,
      baseSchema,
      linkTypeDefs,
    ],
    resolvers: {
      CompanyUpdateSubmission: {
        company: {
          fragment: '... on CompanyUpdateSubmission { hash }',
          resolve: ({ hash }, _, context, info) => info.mergeInfo.delegateToSchema({
            schema: baseSchema,
            operation: 'query',
            fieldName: 'contentHash',
            args: { input: { hash, status: 'any' } },
            context,
            info,
          }),
        },
      },
    },
  });
};
