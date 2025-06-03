const {
  LOGO_URL,
  CONTACTS_ENABLED,
  CONTACT_URL,
  CONTACT_TEXT,
  DIRECTORY_ENABLED,
  DIRECTORY_CATEGORY_IDS,
  DIRECTORY_SELECTION_MAX,
  DIRECTORY_SECTIONS_ENABLED,
  DIRECTORY_SECTIONS_ALIAS,
  DIRECTORY_SECTIONS_PRIMARY_SITE_ONLY,
  DIRECTORY_SECTIONS_SCHEDULED_SITE_ONLY,
  DOCUMENTS_ENABLED,
  DOCUMENT_LABEL_OPTION,
  LEADERSHIP_ENABLED,
  PROMOTIONS_ENABLED,
  LEADERSHIP_CATEGORY_PREFIX,
  LEADERSHIP_SECTION_ALIAS,
  LEADERSHIP_SECTION_MAX,
  LEADERSHIP_PRIMARY_SITE_ONLY,
  LEADERSHIP_SCHEDULED_SITES_ONLY,
  LEADERSHIP_ALLOW_CATEGORY_REMOVAL,
  COMPANY_DETAILS_EXTRA_FIELDS_ENABLED,
  COMPANY_SERVICES_FIELDS_ENABLED,
  COMPANY_CUSTOM_ATTRIBUTES,
  PORTAL_PAGE_VERBIAGE,
  COMPANY_DETAILS_VERBIAGE,
  PROMOTIONS_VERBIAGE,
  REQUIRED_COMPANY_FIELDS,
  APP_LOCALE,
} = require('../env');

const parseCustomAttributes = () => {
  try {
    return JSON.parse(COMPANY_CUSTOM_ATTRIBUTES);
  } catch (e) {
    return [];
  }
};
const directoryCategoryIds = `${DIRECTORY_CATEGORY_IDS}`.split(',').map(id => parseInt(id, 10)).filter(v => v);
const requiredCompanyFields = `${REQUIRED_COMPANY_FIELDS}`.split(',').filter(v => v);

module.exports = {
  Query: {
    companyUpdateConfig: () => ({
      contactsEnabled: CONTACTS_ENABLED,
      contactUrl: CONTACT_URL,
      contactText: CONTACT_TEXT,
      logoUrl: LOGO_URL,
      companyCustomAttributes: parseCustomAttributes(),
      directoryEnabled: DIRECTORY_ENABLED,
      directorySectionsEnabled: DIRECTORY_SECTIONS_ENABLED,
      directorySectionsAlias: DIRECTORY_SECTIONS_ALIAS,
      directorySectionsPrimarySiteOnly: DIRECTORY_SECTIONS_PRIMARY_SITE_ONLY,
      directorySectionsScheduledSitesOnly: DIRECTORY_SECTIONS_SCHEDULED_SITE_ONLY,
      documentsEnabled: DOCUMENTS_ENABLED,
      documentLabelOption: DOCUMENT_LABEL_OPTION,
      directoryCategoryIds,
      directorySelectionMax: DIRECTORY_SELECTION_MAX === 0 ? null : DIRECTORY_SELECTION_MAX,
      leadershipEnabled: LEADERSHIP_ENABLED,
      leadershipPromotionsEnabled: PROMOTIONS_ENABLED,
      leadershipCategoryPrefix: LEADERSHIP_CATEGORY_PREFIX || 'leadership',
      leadershipSectionAlias: LEADERSHIP_SECTION_ALIAS,
      leadershipSectionMax: LEADERSHIP_SECTION_MAX,
      leadershipPrimarySiteOnly: LEADERSHIP_PRIMARY_SITE_ONLY,
      leadershipScheduledSitesOnly: LEADERSHIP_SCHEDULED_SITES_ONLY,
      leadershipAllowCategoryRemoval: LEADERSHIP_ALLOW_CATEGORY_REMOVAL,
      portalPageVerbiage: PORTAL_PAGE_VERBIAGE,
      companyDetailsVerbiage: COMPANY_DETAILS_VERBIAGE,
      promotionsVerbiage: PROMOTIONS_VERBIAGE,
      companyServicesFieldsEnabled: COMPANY_SERVICES_FIELDS_ENABLED,
      companyDetailsExtraFieldsEnabled: COMPANY_DETAILS_EXTRA_FIELDS_ENABLED,
      requiredCompanyFields,
      locale: APP_LOCALE || 'en-us',
    }),
  },
};
