import gql from 'graphql-tag';

export default gql`
fragment CompanyLogoFragment on ContentCompany {
  primaryImage {
    id
    src
  }
}
`;
