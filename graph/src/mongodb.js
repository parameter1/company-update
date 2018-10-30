const { MongoClient, ObjectId } = require('mongodb');
const { MONGO_DSN } = require('./env');

const client = new MongoClient(MONGO_DSN);
const promise = client.connect();

// eslint-disable-next-line no-console
promise.then(() => process.stdout.write(`\n💾  MongoDB connected to ${MONGO_DSN}\n`));
promise.catch((e) => { throw e; });

module.exports = {
  connect: () => promise,
  retrieve: id => client.db().collection('submission').findOne({ _id: new ObjectId(id) }),
  insert: payload => client.db().collection('submission').insertOne(payload),
  complete: id => client.db().collection('submission').updateOne({ _id: new ObjectId(id) }, { $set: { reviewed: true } }),
  submissions: ({ reviewed = false } = { reviewed: false }) => client.db().collection('submission').find({ reviewed }).toArray(),
};
