const { gql } = require('apollo-server');

module.exports = gql`

  extend type Mutation {
    companyUpdateDirectorySubmit(input: CompanyUpdateDirectoryMutationInput): CompanyUpdateSubmission!
  }

  input CompanyUpdateDirectoryMutationInput {
    name: String!
    email: String!
    hash: String!
    type: CompanyUpdateSubmissionType = directory
    payload: CompanyUpdateDirectoryPayloadInput!
  }

  input CompanyUpdateDirectoryPayloadInput {
    added: [Int!]!
    removed: [Int!]!
  }

`;
