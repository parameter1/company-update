const { gql } = require('apollo-server');

module.exports = gql`

  scalar ObjectID

  extend type Query {
    companyUpdateLeadership: [CompanyUpdateLeadership!]!
  }

  type CompanyUpdateLeadership {
    site: WebsiteSite!
    section: WebsiteSection!
  }

  type WebsiteSite {
    id: ObjectID!
    name: String!
    host: String!
  }

  type WebsiteSection {
    id: Int!
    name: String!
  }

`;
