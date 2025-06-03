import gql from 'graphql-tag';

export default gql`
fragment CompanyPromotionsFragment on ContentCompany {
  promotions: relatedContent(input: {
    queryTypes: [company],
    includeContentTypes: [Promotion],
    pagination: { limit: 0 },
  }) {
    edges {
      node {
        id
        name(input: { mutation: Website })
        primaryImage{
          id
          src(input: {
            options: {
              auto: "format",
              fit: "crop",
              h: 180,
              w: 240,
            }
          })
          alt
          isLogo
        }
        ... on ContentPromotion {
          linkUrl
          linkText
        }
      }
    }
  }
}
`;
