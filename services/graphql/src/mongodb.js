const { MongoClient, ObjectId } = require('mongodb');
const { filterDsn } = require('@parameter1/base-cms-db/utils');
const { MONGO_DSN, TENANT_KEY } = require('./env');

const client = new MongoClient(MONGO_DSN);
const promise = client.connect();
const tenant = TENANT_KEY;
const type = { $exists: true };

// eslint-disable-next-line no-console
promise.then((connection) => {
  const url = filterDsn(connection);
  process.stdout.write(`\n💾  MongoDB connected to ${url}\n`);
});
promise.catch((e) => { throw e; });

module.exports = {
  connect: () => promise,
  retrieve: id => client.db().collection('submission').findOne({ tenant, _id: new ObjectId(id) }),
  insert: payload => client.db().collection('submission').insertOne({ tenant, ...payload }),
  complete: id => client.db().collection('submission').updateOne({ tenant, _id: new ObjectId(id) }, { $set: { reviewed: true } }),
  submissions: (all = false) => client.db().collection('submission').find({ tenant, type, ...(!all && { reviewed: false }) }).toArray(),
  submissionCount: () => client.db().collection('submission').countDocuments({ tenant, type, reviewed: false }),
};
