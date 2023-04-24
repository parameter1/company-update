const { gql } = require('apollo-server');

module.exports = gql`

  extend type Query {
    companyUpdateConfig: CompanyUpdateConfiguration!
  }

  type CompanyUpdateConfiguration {
    logoUrl: String
    contactsEnabled: Boolean!
    contactUrl: String
    contactText: String
    companyCustomAttributes: [CompanyCustomAttribute!]!
    directoryEnabled: Boolean!
    directoryCategoryIds: [Int!]
    directorySelectionMax: Int
    onlineDirectoryEnabled: Boolean!
    onlineDirectoryAlias: String!
    onlineDirectorySectionMax: Int!
    onlineDirectoryPrimarySiteOnly: Boolean!
    onlineDirectoryScheduledSitesOnly: Boolean!
    leadershipEnabled: Boolean!
    leadershipPromotionsEnabled: Boolean!
    leadershipPrimarySiteOnly: Boolean!
    leadershipScheduledSitesOnly: Boolean!
    leadershipCompanyLabel: String
    leadershipCategoryPrefix: String!
    leadershipSectionAlias: String!
    leadershipSectionMax: Int!
    locale: String!
    portalPageVerbiage: String
    companyDetailsVerbiage: String
    promotionsVerbiage: String
  }

  type CompanyCustomAttribute {
    key: String!
    label: String!
    description: String
    category: String
  }

`;
