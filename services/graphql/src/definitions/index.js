const { gql } = require('apollo-server');
const company = require('./company');
const leadership = require('./leadership');

module.exports = gql`

  scalar Upload
  scalar Date

  type Query {
    ping: String!
    companyUpdateConfig: CompanyUpdateConfiguration!
    companyUpdateSubmissions(input: CompanyUpdateSubmissionsInput = {}): [CompanyUpdateSubmission!]!
    companyUpdateSubmissionCount: Int!
  }

  type Mutation {
    ping: String!
  }

  enum ContactTypes {
    sales
    listing
    public
  }

  enum CompanyUpdateSubmissionType {
    company
    product
    contact
    leadership
  }

  type CompanyUpdateConfiguration {
    logoUrl: String
    contactUrl: String
    leadershipSectionIds: [Int!]
    leadershipSectionMax: Int!
  }

  input CompanyUpdateSubmissionsInput {
    all: Boolean = false
  }

  ${company}
  ${leadership}

`;
