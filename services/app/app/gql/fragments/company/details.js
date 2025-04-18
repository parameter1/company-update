import gql from 'graphql-tag';

export default gql`
fragment CompanyDetailsFragment on ContentCompany {
  name(input: { mutation: Website })
  teaser(input: { mutation: Website, maxLength: 0 })
  body(input: { mutation: Website })
  numberOfEmployees
  yearsInOperation
  salesRegion
  salesChannels
}
`;
