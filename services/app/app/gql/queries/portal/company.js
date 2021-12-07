import gql from 'graphql-tag';
import CompanyListFragment from "../../fragments/company/list";
import CompanyDetailsFragment from "../../fragments/company/details";
import CompanyAddressFragment from "../../fragments/company/address";
import CompanyContactFragment from "../../fragments/company/contact";
import CompanySocialFragment from "../../fragments/company/social";
import CompanyServicesFragment from "../../fragments/company/services";
import CompanyImagesFragment from "../../fragments/company/images";
import CompanyLogoFragment from "../../fragments/company/logo";
import CompanyYoutubeFragment from "../../fragments/company/youtube";

export default (customAttributes = []) => gql`
query ContentUpdatePortalCompany($input: ContentHashQueryInput!) {
  contentHash(input: $input) {
    ...CompanyListFragment
    ...CompanyDetailsFragment
    ...CompanyAddressFragment
    ...CompanyContactFragment
    ...CompanySocialFragment
    ...CompanyServicesFragment
    ...CompanyImagesFragment
    ...CompanyYoutubeFragment
    ${customAttributes.map((key) => `
    ${key}: customAttribute(input: { path: "${key}" })`).join('')}
  }
}
${CompanyListFragment}
${CompanyDetailsFragment}
${CompanyAddressFragment}
${CompanyContactFragment}
${CompanySocialFragment}
${CompanyServicesFragment}
${CompanyImagesFragment}
${CompanyLogoFragment}
${CompanyYoutubeFragment}
`;
