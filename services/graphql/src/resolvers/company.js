const uuid = require('uuid/v4');
const { notify, thank } = require('../mailer');
const env = require('../env');
const s3Client = require('../s3-client');
const { retrieve, insert, complete } = require('../mongodb');

const { TENANT_KEY, AWS_S3_BUCKET } = env;

module.exports = {
  /**
   *
   */
  CompanyUpdateSubmission: {
    id: ({ _id }) => _id.toString(),
    submitted: ({ _id }) => _id.getTimestamp(),
    payload: ({ payload }) => JSON.stringify(payload),
    label: ({ type }) => `${type.charAt(0).toUpperCase()}${type.slice(1)}`,
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    companyUpdateSubmission: (_, { id }) => retrieve(id),
  },
  /**
   *
   */
  Mutation: {
    /**
     *
     */
    companyUpdateSubmit: async (_, { input }, ctx) => {
      const reviewed = false;
      const res = await insert({ reviewed, ...input });
      if (!res.result.ok) throw new Error('Unable to save your changes, please try again.');
      const submission = await retrieve(res.insertedId);
      notify(submission, ctx);
      thank(submission, ctx);
      return submission;
    },

    /**
     *
     */
    companyUpdateComplete: async (_, { id }) => {
      await complete(id);
      return 'ok';
    },

    /**
     *
     */
    companyUpdateDiscard: async (_, { id }) => {
      await complete(id);
      return 'ok';
    },

    /**
     *
     */
    companyUpdateSingleUpload: async (_, { file }) => {
      const { createReadStream, filename, mimetype } = await file;
      const Bucket = AWS_S3_BUCKET;
      const Key = `${TENANT_KEY}/${uuid()}/${filename}`;

      const response = await s3Client.upload({
        Bucket,
        Key,
        Body: createReadStream(),
        ACL: 'public-read',
        ContentType: mimetype,
      }).promise();
      return response.Location;
    },
  },
};
