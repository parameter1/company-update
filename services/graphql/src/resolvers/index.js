const deepAssign = require('deep-assign');
// const GraphQLJSON = require('graphql-type-json');
const { DateType } = require('@limit0/graphql-custom-types');

const company = require('./company');
const config = require('./config');
const contacts = require('./contacts');
const directory = require('./directory');
const directorySections = require('./directory-sections');
const leadership = require('./leadership');
const list = require('./list');
const promotions = require('./promotions');
const documents = require('./documents');

module.exports = deepAssign(
  company,
  config,
  contacts,
  directory,
  directorySections,
  leadership,
  list,
  promotions,
  documents,
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
