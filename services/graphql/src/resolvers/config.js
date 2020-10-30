const {
  LOGO_URL,
  CONTACT_URL,
  CONTACT_TEXT,
  LEADERSHIP_ENABLED,
  PROMOTIONS_ENABLED,
  LEADERSHIP_COMPANY_LABEL,
  LEADERSHIP_SECTION_ALIAS,
  LEADERSHIP_SECTION_MAX,
} = require('../env');

module.exports = {
  Query: {
    companyUpdateConfig: () => ({
      contactUrl: CONTACT_URL,
      contactText: CONTACT_TEXT,
      logoUrl: LOGO_URL,
      leadershipEnabled: LEADERSHIP_ENABLED,
      leadershipPromotionsEnabled: PROMOTIONS_ENABLED,
      leadershipCompanyLabel: LEADERSHIP_COMPANY_LABEL || null,
      leadershipSectionAlias: LEADERSHIP_SECTION_ALIAS,
      leadershipSectionMax: LEADERSHIP_SECTION_MAX,
    }),
  },
};
