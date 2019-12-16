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
    add: [CompanyUpdateContactCreateInput!]
    remove: [Int!]
    update: [CompanyUpdateContactUpdateInput!]
  }

  input CompanyUpdateContactCreateInput {
    id: String
    firstName: String!
    lastName: String!
    title: String
    primaryImage: CompanyUpdateContactImageInput
  }

  input CompanyUpdateContactUpdateInput {
    id: Int!
    firstName: String
    lastName: String
    title: String
    primaryImage: CompanyUpdateContactImageInput
  }

  input CompanyUpdateContactImageInput {
    src: String
  }

`;
