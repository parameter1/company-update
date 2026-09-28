import gql from 'graphql-tag';

export default gql`
fragment CompanyDetailsFragment on ContentCompany {
  name(input: { mutation: Website })
  teaser(input: { mutation: Website, minLength: 0, maxLength: 0 })
  body(input: { mutation: Website })
  numberOfEmployees
  yearsInOperation
  salesRegion
  salesChannels
}
`;
