const { mergeSchemas } = require('graphql-tools');

const createBaseSchema = require('./base');
const createLocalSchema = require('./local');

module.exports = async () => {
  const localSchema = await createLocalSchema();
  const baseSchema = await createBaseSchema();
  process.stdout.write('🌐  Remote schema retrieved.\n');

  return mergeSchemas({
    schemas: [localSchema, baseSchema],
  });
};
