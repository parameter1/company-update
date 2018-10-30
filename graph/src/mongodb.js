const { MongoClient, ObjectId } = require('mongodb');
const { MONGO_DSN, B4GRAPH_TENANT_KEY } = require('./env');

const client = new MongoClient(MONGO_DSN);
const promise = client.connect();
const tenant = B4GRAPH_TENANT_KEY;

// eslint-disable-next-line no-console
promise.then(() => process.stdout.write(`\n💾  MongoDB connected to ${MONGO_DSN}\n`));
promise.catch((e) => { throw e; });

module.exports = {
  connect: () => promise,
  retrieve: id => client.db().collection('submission').findOne({ tenant, _id: new ObjectId(id) }),
  insert: payload => client.db().collection('submission').insertOne({ tenant, ...payload }),
  complete: id => client.db().collection('submission').updateOne({ tenant, _id: new ObjectId(id) }, { $set: { reviewed: true } }),
  submissions: ({ reviewed = false } = { reviewed: false }) => client.db().collection('submission').find({ tenant, reviewed }).toArray(),
  submissionCount: () => client.db().collection('submission').countDocuments({ tenant, reviewed: false }),
};
