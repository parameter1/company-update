const { gql } = require('apollo-server');

module.exports = gql`

  extend type Query {
    companyUpdateSubmission(id: String!): CompanyUpdateSubmission!
  }

  extend type Mutation {
    companyUpdateSubmit(input: CompanyUpdateSubmissionInput!): CompanyUpdateSubmission!
    companyUpdateComplete(id: String!): String!
    companyUpdateDiscard(id: String!): String!
    companyUpdateSingleUpload(file: Upload!): String!
  }

  type CompanyUpdateSubmission {
    id: String!
    submitted: Date!
    reviewed: Boolean!
    name: String!
    hash: String!
    email: String!
    companyName: String
    type: CompanyUpdateSubmissionType!
    payload: String!
  }

  input CompanyUpdateSubmissionInput {
    name: String!
    email: String!
    hash: String!
    type: CompanyUpdateSubmissionType!
    payload: CompanyUpdatePayloadInput!
  }

  input CompanyUpdatePayloadInput {
    name: String
    address1: String
    address2: String
    city: String
    state: String
    zip: String
    country: String
    phone: String
    tollfree: String
    fax: String
    website: String
    type: String
    email: String
    body: String
    socialLinks: [SocialLinkInput!]

    teaser: String
    numberOfEmployees: String
    trainingInformation: String
    yearsInOperation: String
    salesRegion: String
    servicesProvided: String
    salesChannels: String
    productSummary: String
    serviceInformation: String
    warrantyInformation: String

    logo: String
  }

  input SocialLinkInput {
    provider: String!
    url: String!
  }

`;
