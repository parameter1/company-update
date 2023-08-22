import gql from 'graphql-tag';

export default gql`
fragment CompanyContactFragment on ContentCompany {
  phone
  tollfree
  fax
  mobile
  website
  email
  publicEmail
}
`;
