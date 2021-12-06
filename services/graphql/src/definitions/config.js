const { gql } = require('apollo-server');

module.exports = gql`

  extend type Query {
    companyUpdateConfig: CompanyUpdateConfiguration!
  }

  type CompanyUpdateConfiguration {
    logoUrl: String
    contactUrl: String
    contactText: String
    companyCustomAttributes: [CompanyCustomAttribute!]!
    leadershipEnabled: Boolean!
    leadershipPromotionsEnabled: Boolean!
    leadershipCompanyLabel: String
    leadershipSectionAlias: String!
    leadershipSectionMax: Int!
    locale: String!
  }

  type CompanyCustomAttribute {
    key: String!
    label: String!
    description: String
  }

`;
