const { gql } = require('apollo-server');
const company = require('./company');
const config = require('./config');
const contacts = require('./contacts');
const directory = require('./directory');
const leadership = require('./leadership');
const list = require('./list');
const review = require('./review');
const promotions = require('./promotions');

module.exports = gql`

  scalar Upload
  scalar Date
  scalar JSON
  scalar ObjectID

  type Query {
    ping: String!
  }

  type Mutation {
    ping: String!
  }

  enum ContactTypes {
    sales
    listing
    public
  }

  enum CompanyUpdateSubmissionType {
    company
    product
    contact
    leadership
    promotion
    directoryCategories
  }

  ${company}
  ${config}
  ${contacts}
  ${directory}
  ${leadership}
  ${list}
  ${review}
  ${promotions}

`;
