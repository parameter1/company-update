const { gql } = require('apollo-server');

module.exports = gql`

  extend type Mutation {
    companyUpdateDocumentsSubmit(input: CompanyUpdateDocumentsMutationInput): CompanyUpdateSubmission!
  }

  input CompanyUpdateDocumentsPayloadInput {
    add: [CompanyUpdateDocumentCreateInput!]
    remove: [Int!]
    update: [CompanyUpdateDocumentUpdateInput!]
  }

  input CompanyUpdateDocumentCreateInput {
    id: String!
    name: String!
    teaser: String
    fileSrc: String
    labels: [String]!
  }

  input CompanyUpdateDocumentsMutationInput {
    name: String!
    email: String!
    hash: String!
    type: CompanyUpdateSubmissionType = Document
    payload: CompanyUpdateDocumentsPayloadInput!
  }

  input CompanyUpdateDocumentUpdateInput {
    id: Int!
    name: String
    teaser: String
    fileSrc: String
    labels: [String]
  }

`;
