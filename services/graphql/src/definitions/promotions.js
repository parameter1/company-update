const { gql } = require('apollo-server');

module.exports = gql`

  extend type Mutation {
    companyUpdatePromotionsSubmit(input: CompanyUpdatePromotionsMutationInput): CompanyUpdateSubmission!
  }

  input CompanyUpdatePromotionsMutationInput {
    name: String!
    email: String!
    hash: String!
    type: CompanyUpdateSubmissionType = Promotion
    payload: CompanyUpdatePromotionsPayloadInput!
  }

  input CompanyUpdatePromotionsPayloadInput {
    add: [CompanyUpdatePromotionCreateInput!]
    remove: [Int!]
    update: [CompanyUpdatePromotionUpdateInput!]
  }

  input CompanyUpdatePromotionCreateInput {
    id: String
    linkUrl: String!
    linkText: String!
    primaryImage: CompanyUpdatePromotionImageInput
  }

  input CompanyUpdatePromotionUpdateInput {
    id: Int!
    linkUrl: String
    linkText: String
    primaryImage: CompanyUpdatePromotionImageInput
  }

  input CompanyUpdatePromotionImageInput {
    src: String
  }

`;
