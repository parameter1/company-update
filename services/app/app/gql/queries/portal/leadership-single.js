import gql from 'graphql-tag';
import LeadershipSectionFragment from '../../fragments/leadership/section';
import CompanyListFragment from '../../fragments/company/list';

export default gql`
query ContentUpdateLeadershipData(
  $site: WebsiteSiteQueryInput!,
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
        alias
      }
      option {
        id
        name
      }
    }
  }
  websiteSite(input: $site) {
    id
    name
  }
  websiteSections(input: $leaders) {
    totalCount
    edges {
      node {
        # Primary
        ...LeadershipSectionFragment
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
