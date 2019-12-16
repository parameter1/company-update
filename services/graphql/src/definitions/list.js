const { gql } = require('apollo-server');

module.exports = gql`

  extend type Query {
    companyUpdateSubmissions(input: CompanyUpdateSubmissionsInput = {}): [CompanyUpdateSubmission!]!
    companyUpdateSubmissionCount: Int!
  }

  input CompanyUpdateSubmissionsInput {
    all: Boolean = false
  }

`;
