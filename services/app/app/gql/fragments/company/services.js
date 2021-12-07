import gql from 'graphql-tag';

export default gql`
fragment CompanyServicesFragment on ContentCompany {
  externalLinks {
    key
    url
    label
  }
  productSummary
  servicesProvided
  warrantyInformation
  trainingInformation
  serviceInformation
}
`;
