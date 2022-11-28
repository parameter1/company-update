import gql from 'graphql-tag';
import LeadershipSectionFragment from '../../fragments/leadership/section';
import CompanyListFragment from '../../fragments/company/list';

export default gql`
query ContentUpdateLeadershipData(
  $sites: WebsiteSitesQueryInput!,
  $leaders: WebsiteSectionsQueryInput!,
  $children: WebsiteSectionChildrenInput!,
  $content: ContentHashQueryInput!,
) {
  contentHash(input: $content) {
    ...CompanyListFragment
    websiteSchedules {
      section {
        id
        name
        site {
          id
        }
      }
      option {
        id
        name
      }
    }
  }
  websiteSites(input: $sites) {
    edges {
      node {
        id
        name
      }
    }
    totalCount
  }
  websiteSections(input: $leaders) {
    totalCount
    edges {
      node {
        # Primary
        ...LeadershipSectionFragment
        site {
          id
        }
        children(input: $children) {
          totalCount
          edges {
            node {
              # Secondary
              ...LeadershipSectionFragment
              children(input: $children) {
                totalCount
                edges {
                  node {
                    # Tertiary
                    ...LeadershipSectionFragment
                    children(input: $children) {
                      totalCount
                      edges {
                        node {
                          # Quaternary
                          ...LeadershipSectionFragment
                            children(input: $children) {
                              totalCount
                              edges {
                                node {
                                # Quaternary
                                ...LeadershipSectionFragment
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
${CompanyListFragment}
`;
