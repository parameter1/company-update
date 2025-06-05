import gql from 'graphql-tag';

export default gql`
fragment CompanyListFragment on ContentCompany {
  id
  name(input: { mutation: Website })
  websiteSchedules {
    section {
      id
      alias
    }
  }
  hash
  labels
  primarySite {
    id
  }
}
`;
