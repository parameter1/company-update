const { gql } = require('apollo-server');

module.exports = gql`

  scalar Date
  scalar Upload

  type Query {
    ping: String!
    config: Configuration!
    submission(id: String!): CompanyUpdateSubmission!
    submissions: [CompanyUpdateSubmission!]!
    submissionCount: Int!
  }

  type Mutation {
    company(input: CompanyUpdateInput!): CompanyUpdateSubmission!
    complete(id: String!): MongoUpdate!
    singleUpload(file: Upload!): String!
  }

  type MongoUpdate {
    result: MongoUpdateStatus
  }

  type MongoUpdateStatus {
    ok: Int!
  }

  enum CompanyTypes {
    Company
    Agency
    Association
    Dealer
    Distributor
    Manufacturer
    Service Provider
    Supplier
  }

  enum ContactTypes {
    sales
    listing
    public
  }

  type Configuration {
    domain: String!
    logo: String!
    ids: [Int!]!
    isPmmi: Boolean!
  }

  type CompanyUpdateSubmission {
    id: String!
    submitted: Date!
    reviewed: Boolean!
    name: String!
    hash: String!
    email: String!
    companyName: String
    payload: String!
  }

  input CompanyUpdateInput {
    name: String!
    email: String!
    hash: String!
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
    type: CompanyTypes
    email: String
    body: String

    # contacts: [ContactPayloadInput]
    sectionIds: [Int!]
    # images: [ImagePayloadInput]
    logo: String
  }

  input ContactPayloadInput {
    id: String
    delete: Boolean
    firstName: String
    lastName: String
    title: String
    email: String
    type: ContactTypes
  }

  input SectionPayloadInput {
    id: Int
    delete: Boolean
    name: String
  }

  input ImagePayloadInput {
    id: String
    delete: Boolean
    src: String
  }
`;
