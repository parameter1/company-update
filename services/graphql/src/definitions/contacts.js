const { gql } = require('apollo-server');

module.exports = gql`

  extend type Mutation {
    companyUpdateContactsSubmit(input: CompanyUpdateContactsMutationInput): CompanyUpdateSubmission!
  }

  input CompanyUpdateContactsMutationInput {
    name: String!
    email: String!
    hash: String!
    type: CompanyUpdateSubmissionType = Contacts
    payload: CompanyUpdateContactsPayloadInput!
  }

  input CompanyUpdateContactsPayloadInput {
    contacts: [CompanyUpdateContactInput!]!
  }

  input CompanyUpdateContactInput {
    id: Int
    firstName: String!
    lastName: String!
    title: String
    primaryImage: CompanyUpdateContactImageInput = {}
  }

  input CompanyUpdateContactImageInput {
    src: String
  }

`;
