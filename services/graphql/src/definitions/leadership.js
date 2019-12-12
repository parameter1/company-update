const { gql } = require('apollo-server');

module.exports = gql`

  extend type Mutation {
    companyUpdateLeadershipSubmit(input: CompanyUpdateLeadershipMutationInput): CompanyUpdateSubmission!
  }

  input CompanyUpdateLeadershipMutationInput {
    name: String!
    email: String!
    hash: String!
    type: CompanyUpdateSubmissionType = leadership
    payload: CompanyUpdateLeadershipPayloadInput!
  }

  input CompanyUpdateLeadershipPayloadInput {
    categories: [Int!]!
  }

`;
