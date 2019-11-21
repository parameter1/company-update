const { isURL } = require('validator');

const {
  cleanEnv,
  makeValidator,
  port,
  email,
  json,
} = require('envalid');

const mongodsn = makeValidator((v) => {
  const opts = { protocols: ['mongodb'], require_tld: false, require_protocol: true };
  if (isURL(v, opts)) return v;
  throw new Error('Expected a Mongo DSN string with mongodb://');
});

const nonemptystr = makeValidator((v) => {
  const err = new Error('Expected a non-empty string');
  if (v === undefined || v === null || v === '') {
    throw err;
  }
  const trimmed = String(v).trim();
  if (!trimmed) throw err;
  return trimmed;
});

module.exports = cleanEnv(process.env, {
  PORT: port({ desc: 'The port the Apollo server will listen on', default: 80 }),
  MONGO_DSN: mongodsn({ desc: 'The MongoDB DSN to connect to.', default: 'mongodb://mongo/cuf' }),
  B4GRAPH_URI: nonemptystr({ desc: 'The URI to access the Base4 GraphQL instance' }),
  B4GRAPH_API_KEY: nonemptystr({ desc: 'The api key to use with the Base4 GraphQL instance' }),
  TENANT_KEY: nonemptystr({ desc: 'The tenant key to use with the Base4 GraphQL instance' }),
  AWS_ACCESS_KEY_ID: nonemptystr({ desc: 'The AWS access key value.' }),
  AWS_SECRET_ACCESS_KEY: nonemptystr({ desc: 'The AWS secret access key value.' }),
  AWS_S3_BUCKET: nonemptystr({ desc: 'The AWS S3 Bucket name to use for file uploads.', default: 'cuf-uploads' }),
  SENDGRID_API_KEY: nonemptystr({ desc: 'The SendGrid API key for sending email.' }),
  SENDGRID_FROM: nonemptystr({ desc: 'The from name to use when sending email via SendGrid, e.g. Foo <foo@bar.com>', default: 'no-reply@baseplatform.io' }),
  PLATFORM_URI: nonemptystr({ desc: 'The primary uri for the related platform tenant.' }),
  PLATFORM_LOGO: nonemptystr({ desc: 'The uri to the platform tenant\'s logo.' }),
  PLATFORM_SECTIONS: json({ desc: 'A JSON array of the top-level platform section IDs for this tenant.' }),
  NOTIFICATION_TO: email({ desc: 'The email address notifications are sent to.' }),
});
