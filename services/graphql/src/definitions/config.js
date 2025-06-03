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
    companyDetailsExtraFieldsEnabled: Boolean!,
    companyServicesFieldsEnabled: Boolean!,
    directoryEnabled: Boolean!
    documentsEnabled: Boolean!
    documentLabelOption: String
    directoryCategoryIds: [Int!]
    directorySelectionMax: Int
    directorySectionsEnabled: Boolean!
    directorySectionsAlias: String!
    directorySectionsPrimarySiteOnly: Boolean!
    directorySectionsScheduledSitesOnly: Boolean!
    leadershipEnabled: Boolean!
    leadershipPromotionsEnabled: Boolean!
    leadershipPrimarySiteOnly: Boolean!
    leadershipScheduledSitesOnly: Boolean!
    leadershipAllowCategoryRemoval: Boolean!
    leadershipCategoryPrefix: String!
    leadershipSectionAlias: String!
    leadershipSectionMax: Int!
    locale: String!
    portalPageVerbiage: String
    companyDetailsVerbiage: String
    promotionsVerbiage: String
    requiredCompanyFields: [String!]!
  }

  type CompanyCustomAttribute {
    key: String!
    label: String!
    description: String
    category: String
  }

`;
