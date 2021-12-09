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
        # Root sections
        sections(input: $leaders) {
          totalCount
          edges {
            node {
              ...LeadershipSectionFragment,
              # Primary
              children(input: $children) {
                totalCount
                edges {
                  node {
                    ...LeadershipSectionFragment,
                    # Secondary
                    children(input: $children) {
                      totalCount
                      edges {
                        node {
                          ...LeadershipSectionFragment,
                          # Tertiary
                          children(input: $children) {
                            totalCount
                            edges {
                              node {
                                ...LeadershipSectionFragment,
                                # Quaternary
                                children(input: $children) {
                                  totalCount
                                  edges {
                                    node {
                                      ...LeadershipSectionFragment,
                                      # Quinary???
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
