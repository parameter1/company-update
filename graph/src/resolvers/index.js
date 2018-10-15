const { DateType } = require('@limit0/graphql-custom-types');
const { retrieve, insert, complete } = require('../mongodb');
const { notify, thank } = require('../mailer');
const {
  PLATFORM_URI,
  PLATFORM_LOGO,
  PLATFORM_SECTIONS,
} = require('../env');

const config = {
  domain: PLATFORM_URI,
  logo: PLATFORM_LOGO,
  ids: PLATFORM_SECTIONS,
};

module.exports = {
  Date: DateType,

  CompanyUpdateSubmission: {
    id: ({ _id }) => _id.toString(),
    submitted: ({ _id }) => _id.getTimestamp(),
    payload: ({ payload }) => JSON.stringify(payload),
  },

  Query: {
    config: () => config,
    submission: (_, { id }) => retrieve(id),
  },
  Mutation: {
    company: async (_, { input }) => {
      const reviewed = false;
      const res = await insert({ reviewed, ...input });
      if (!res.result.ok) throw new Error('Unable to save your changes, please try again.');
      const submission = await retrieve(res.insertedId);
      await notify(submission);
      await thank(submission);
      return submission;
    },
    complete: (_, { id }) => complete(id),
  },
};
