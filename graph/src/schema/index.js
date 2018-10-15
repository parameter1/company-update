const { mergeSchemas } = require('graphql-tools');

const createBaseSchema = require('./base');
const createLocalSchema = require('./local');

module.exports = async () => {
  const localSchema = await createLocalSchema();
  const baseSchema = await createBaseSchema();
  process.stdout.write('🌐  Remote schema retrieved.\n');
  const linkTypeDefs = `
  extend type Configuration {
    sections: Base4WebsiteSectionConnection!
  }
`;

  return mergeSchemas({
    schemas: [localSchema, baseSchema, linkTypeDefs],
    resolvers: {
      Configuration: {
        sections: {
          fragment: '... on Configuration { ids }',
          resolve({ ids }, args, context, info) {
            return info.mergeInfo.delegateToSchema({
              schema: baseSchema,
              operation: 'query',
              fieldName: 'base4WebsiteSections',
              args: { input: { ids } },
              info,
            });
          },
        },
      },
    },
  });
};
