const { gql } = require('apollo-server');

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
module.exports = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Company {
    name: String!
    hash: String!
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
    type: String
    email: String
    body: String
    primaryImage: String

    products: [Product]
    contacts: [Contact]
    images: [Image]
    sections: [Section]
  }

type Contact {
  firstName: String
  lastName: String
  title: String
  hash: String
}

type Product {
  name: String
  hash: String
}

type Image {
  name: String
  src: String
}

type Section {
  name: String
  children: [Section]
}

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    company(hash: String!): Company
  }
`;
