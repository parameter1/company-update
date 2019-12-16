const { submissions, submissionCount } = require('../mongodb');

module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    companyUpdateSubmissions: (_, { input }) => submissions(input.all),

    /**
     *
     */
    companyUpdateSubmissionCount: () => submissionCount(),
  },
};
