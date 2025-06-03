const { notify, thank } = require('../mailer');
const { retrieve, insert } = require('../mongodb');

module.exports = {
  /**
   *
   */
  Mutation: {
    /**
     *
     */
    companyUpdateDocumentsSubmit: async (_, { input }, ctx) => {
      const reviewed = false;
      const res = await insert({ reviewed, ...input });
      if (!res.result.ok) throw new Error('Unable to save your changes, please try again.');
      const submission = await retrieve(res.insertedId);
      notify(submission, ctx);
      thank(submission, ctx);
      return submission;
    },
  },
};
