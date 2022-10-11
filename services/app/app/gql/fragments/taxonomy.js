import gql from 'graphql-tag';

export default gql`
fragment TaxonomyDetailFragment on Taxonomy {
  id
  name
}
`;
