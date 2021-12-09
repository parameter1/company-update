import gql from 'graphql-tag';

export default gql`
fragment LeadershipSectionFragment on WebsiteSection {
  id
  name
  alias
}
`;
