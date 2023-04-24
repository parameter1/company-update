const {
  LOGO_URL,
  CONTACTS_ENABLED,
  CONTACT_URL,
  CONTACT_TEXT,
  DIRECTORY_ENABLED,
  DIRECTORY_CATEGORY_IDS,
  DIRECTORY_SELECTION_MAX,
  ONLINE_DIRECTORY_ENABLED,
  ONLINE_DIRECTORY_ALIAS,
  ONLINE_DIRECTORY_MAX,
  ONLINE_DIRECTORY_PRIMARY_SITE_ONLY,
  ONLINE_DIRECTORY_SCHEDULED_SITE_ONLY,
  LEADERSHIP_ENABLED,
  PROMOTIONS_ENABLED,
  LEADERSHIP_COMPANY_LABEL,
  LEADERSHIP_CATEGORY_PREFIX,
  LEADERSHIP_SECTION_ALIAS,
  LEADERSHIP_SECTION_MAX,
  LEADERSHIP_PRIMARY_SITE_ONLY,
  LEADERSHIP_SCHEDULED_SITES_ONLY,
  COMPANY_CUSTOM_ATTRIBUTES,
  PORTAL_PAGE_VERBIAGE,
  COMPANY_DETAILS_VERBIAGE,
  PROMOTIONS_VERBIAGE,
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

module.exports = {
  Query: {
    companyUpdateConfig: () => ({
      contactsEnabled: CONTACTS_ENABLED,
      contactUrl: CONTACT_URL,
      contactText: CONTACT_TEXT,
      logoUrl: LOGO_URL,
      companyCustomAttributes: parseCustomAttributes(),
      directoryEnabled: DIRECTORY_ENABLED,
      onlineDirectoryEnabled: ONLINE_DIRECTORY_ENABLED,
      onlineDirectoryAlias: ONLINE_DIRECTORY_ALIAS,
      onlineDirectorySectionMax: ONLINE_DIRECTORY_MAX,
      onlineDirectoryPrimarySiteOnly: ONLINE_DIRECTORY_PRIMARY_SITE_ONLY,
      onlineDirectoryScheduledSitesOnly: ONLINE_DIRECTORY_SCHEDULED_SITE_ONLY,
      directoryCategoryIds,
      directorySelectionMax: DIRECTORY_SELECTION_MAX === 0 ? null : DIRECTORY_SELECTION_MAX,
      leadershipEnabled: LEADERSHIP_ENABLED,
      leadershipPromotionsEnabled: PROMOTIONS_ENABLED,
      leadershipCompanyLabel: LEADERSHIP_COMPANY_LABEL || null,
      leadershipCategoryPrefix: LEADERSHIP_CATEGORY_PREFIX || 'leadership',
      leadershipSectionAlias: LEADERSHIP_SECTION_ALIAS,
      leadershipSectionMax: LEADERSHIP_SECTION_MAX,
      leadershipPrimarySiteOnly: LEADERSHIP_PRIMARY_SITE_ONLY,
      leadershipScheduledSitesOnly: LEADERSHIP_SCHEDULED_SITES_ONLY,
      portalPageVerbiage: PORTAL_PAGE_VERBIAGE,
      companyDetailsVerbiage: COMPANY_DETAILS_VERBIAGE,
      promotionsVerbiage: PROMOTIONS_VERBIAGE,
      locale: APP_LOCALE || 'en-us',
    }),
  },
};
