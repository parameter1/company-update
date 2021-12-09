import gql from 'graphql-tag';
import CompanyLogoFragment from "./logo"

export default gql`
fragment CompanyImagesFragment on ContentCompany {
  ...CompanyLogoFragment
  images {
    edges {
      node {
        id
      }
    }
  }
}
${CompanyLogoFragment}
`;
