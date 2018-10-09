const { mergeSchemas } = require('graphql-tools');

const createBaseSchema = require('./base');
const createLocalSchema = require('./local');

module.exports = async () => {
  const localSchema = await createLocalSchema();
  const baseSchema = await createBaseSchema();

  return mergeSchemas({
    schemas: [localSchema, baseSchema],
  });
};
