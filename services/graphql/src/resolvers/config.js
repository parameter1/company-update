const { LOGO_URL, CONTACT_URL, LEADERSHIP_SECTION_MAX } = require('../env');

module.exports = {
  Query: {
    companyUpdateConfig: () => ({
      contactUrl: CONTACT_URL,
      logoUrl: LOGO_URL,
      leadershipSectionMax: LEADERSHIP_SECTION_MAX,
    }),
  },
};
