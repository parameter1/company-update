import gql from 'graphql-tag';

export default gql`
fragment CompanyContactsFragment on ContentCompany {
  publicContacts(input: { pagination: { limit: 0 } }) {
    edges {
      node {
        id
        firstName
        lastName
        title
        primaryImage {
          id
          src
        }
      }
    }
  }
}
`;
