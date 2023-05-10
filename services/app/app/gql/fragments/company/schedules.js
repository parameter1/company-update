import gql from 'graphql-tag';

export default gql`
fragment CompanySchedulesFragment on ContentCompany {
  published
  websiteSchedules {
    start
    section {
      id
      name
      alias
    }
  }
}
`;
