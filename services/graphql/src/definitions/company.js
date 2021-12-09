const { gql } = require('apollo-server');

module.exports = gql`

  extend type Query {
    companyUpdateSubmission(id: String!): CompanyUpdateSubmission!
  }

  extend type Mutation {
    companyUpdateSubmit(input: CompanyUpdateSubmissionInput!): CompanyUpdateSubmission!
    companyUpdateSingleUpload(file: Upload!): String!
  }

  type CompanyUpdateSubmission {
    id: ObjectID!
    submitted: Date!
    reviewed: Boolean!
    name: String!
    hash: String!
    email: String!
    type: CompanyUpdateSubmissionType!
    payload: String!
    label: String!
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
    externalLinks: [ExternalLinkInput!]
    socialLinks: [SocialLinkInput!]
    youtube: CompanyUpdatePayloadYoutubeInput = {}
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
    customAttributes: JSON
  }

  input ExternalLinkInput {
    key: String!
    url: String!
  }

  input SocialLinkInput {
    provider: String!
    url: String!
  }

  input CompanyUpdatePayloadYoutubeInput {
    playlistId: String
    channelId: String
    username: String
  }

`;
