import gql from 'graphql-tag';

export default gql`
fragment CompanyListFragment on ContentCompany {
  id
  name
  hash
  labels
  primarySite {
    id
  }
}
`;
