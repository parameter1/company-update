import gql from 'graphql-tag';

export default gql`
fragment CompanyListFragment on ContentCompany {
  id
  name(input: { mutation: Website })
  hash
  labels
  primarySite {
    id
  }
}
`;
