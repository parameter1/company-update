import gql from 'graphql-tag';

export default gql`
fragment CompanySocialFragment on ContentCompany {
  socialLinks {
    provider
    url
  }
}
`;
