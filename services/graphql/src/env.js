const {
  cleanEnv,
  makeValidator,
  email,
  json,
  url,
} = require('envalid');

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
  MONGO_DSN: nonemptystr({ desc: 'The MongoDB DSN to connect to.', default: 'mongodb://mongo/cuf' }),
  GRAPHQL_URI: url({ desc: 'The URI to access the BaseCMS GraphQL instance' }),
  TENANT_KEY: nonemptystr({ desc: 'The tenant key to use with the BaseCMS GraphQL instance' }),
  AWS_ACCESS_KEY_ID: nonemptystr({ desc: 'The AWS access key value.' }),
  AWS_SECRET_ACCESS_KEY: nonemptystr({ desc: 'The AWS secret access key value.' }),
  AWS_S3_BUCKET: nonemptystr({ desc: 'The AWS S3 Bucket name to use for file uploads.', default: 'cuf-uploads' }),
  SENDGRID_API_KEY: nonemptystr({ desc: 'The SendGrid API key for sending email.' }),
  SENDGRID_FROM: nonemptystr({ desc: 'The from name to use when sending email via SendGrid, e.g. Foo <foo@bar.com>', default: 'no-reply@baseplatform.io' }),
  PLATFORM_URI: url({ desc: 'The primary uri for the related platform tenant.' }),
  PLATFORM_LOGO: nonemptystr({ desc: 'The uri to the platform tenant\'s logo.' }),
  PLATFORM_SECTIONS: json({ desc: 'A JSON array of the top-level platform section IDs for this tenant.' }),
  NOTIFICATION_TO: email({ desc: 'The email address notifications are sent to.' }),
});
