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
        name(input: { mutation: Website })
        teaser(input: { mutation: Website, minLength: 0 })
        labels
        ... on ContentDocument {
          fileSrc
        }
      }
    }
  }
}
`;
