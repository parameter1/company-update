const { gql } = require('apollo-server');

module.exports = gql`

  extend type Mutation {
    companyUpdateDocumentsSubmit(input: CompanyUpdateDocumentsMutationInput): CompanyUpdateSubmission!
  }

  input CompanyUpdateDocumentsPayloadInput {
    add: [CompanyUpdateDocumentPayloadInput!]
    remove: [Int!]
    update: [CompanyUpdateDocumentPayloadInput!]
  }

  input CompanyUpdateDocumentsMutationInput {
    name: String!
    email: String!
    hash: String!
    type: CompanyUpdateSubmissionType = Document
    payload: CompanyUpdateDocumentsPayloadInput!
  }

  input CompanyUpdateDocumentPayloadInput {
    id: Int!
    name: String!
    teaser: String
    fileSrc: String
    labels: [String]!
  }

`;
