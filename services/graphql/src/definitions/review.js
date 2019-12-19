const { gql } = require('apollo-server');

module.exports = gql`

  extend type Mutation {
    companyUpdateComplete(id: String!): String!
    companyUpdateDiscard(id: String!): String!
  }

`;
