import gql from 'graphql-tag';
import LeadershipSectionFragment from '../../fragments/leadership/section';

export default gql`
query ContentUpdateLeadershipData(
  $sites: WebsiteSitesQueryInput!,
  $leaders: WebsiteSiteSectionsInput!,
  $children: WebsiteSectionChildrenInput!
) {
  websiteSites(input: $sites) {
    edges {
      node {
        id
        name
        sections(input: $leaders) {
          edges {
            node {
              ...LeadershipSectionFragment,
              children(input: $children) {
                edges {
                  node {
                    ...LeadershipSectionFragment,
                    children(input: $children) {
                      totalCount
                      edges {
                        node {
                          ...LeadershipSectionFragment,
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
${LeadershipSectionFragment}
`;
