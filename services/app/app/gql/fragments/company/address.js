import gql from 'graphql-tag';

export default gql`
fragment CompanyAddressFragment on ContentCompany {
  address1
  address2
  city
  state
  zip
  country
}
`;
