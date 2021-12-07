import gql from 'graphql-tag';

export default gql`
fragment CompanyDetailsFragment on ContentCompany {
  name
  teaser(input: { maxLength: 0 })
  body
  numberOfEmployees
  yearsInOperation
  salesRegion
  salesChannels
}
`;
