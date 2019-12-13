const deepAssign = require('deep-assign');
// const GraphQLJSON = require('graphql-type-json');
const { DateType } = require('@limit0/graphql-custom-types');

const company = require('./company');
const config = require('./config');
const contacts = require('./contacts');
const leadership = require('./leadership');
const list = require('./list');

module.exports = deepAssign(
  company,
  config,
  contacts,
  leadership,
  list,
  {
    Date: DateType,
    // JSON: GraphQLJSON, // @todo is this needed?

    /**
     *
     */
    Query: {
      /**
       *
       */
      ping: () => 'pong',
    },
    /**
     *
     */
    Mutation: {
      /**
       *
       */
      ping: () => 'pong',
    },
  },
);
