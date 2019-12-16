const { gql } = require('apollo-server');

module.exports = gql`

  extend type Query {
    companyUpdateConfig: CompanyUpdateConfiguration!
  }

  type CompanyUpdateConfiguration {
    logoUrl: String
    contactUrl: String
    leadershipSectionAlias: String!
    leadershipSectionMax: Int!
  }

`;
