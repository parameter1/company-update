const {
  LOGO_URL,
  CONTACT_URL,
  CONTACT_TEXT,
  LEADERSHIP_SECTION_ALIAS,
  LEADERSHIP_SECTION_MAX,
} = require('../env');

module.exports = {
  Query: {
    companyUpdateConfig: () => ({
      contactUrl: CONTACT_URL,
      contactText: CONTACT_TEXT,
      logoUrl: LOGO_URL,
      leadershipSectionAlias: LEADERSHIP_SECTION_ALIAS,
      leadershipSectionMax: LEADERSHIP_SECTION_MAX,
    }),
  },
};
