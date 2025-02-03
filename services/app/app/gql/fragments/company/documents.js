import gql from 'graphql-tag';

export default gql`
fragment CompanyDocumentsFragment on ContentCompany {
  documents: relatedContent(input: {
    queryTypes: [company],
    includeContentTypes: [Document],
    pagination: { limit: 0 },
  }) {
    edges {
      node {
        id
        name
        teaser(input: { minLength: 0 })
        labels
        ... on ContentDocument {
          fileSrc
        }
      }
    }
  }
}
`;
