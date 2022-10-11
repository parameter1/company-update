const deepAssign = require('deep-assign');
// const GraphQLJSON = require('graphql-type-json');
const { DateType } = require('@limit0/graphql-custom-types');

const company = require('./company');
const config = require('./config');
const contacts = require('./contacts');
const directory = require('./directory');
const leadership = require('./leadership');
const list = require('./list');
const promotions = require('./promotions');

module.exports = deepAssign(
  company,
  config,
  contacts,
  directory,
  leadership,
  list,
  promotions,
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
