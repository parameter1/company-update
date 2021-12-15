const {
  cleanEnv,
  makeValidator,
  email,
  url,
  str,
  bool,
  num,
  port,
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
  // Core mandatory configs
  AWS_ACCESS_KEY_ID: nonemptystr({ desc: 'The AWS access key value.' }),
  AWS_SECRET_ACCESS_KEY: nonemptystr({ desc: 'The AWS secret access key value.' }),
  AWS_S3_BUCKET: nonemptystr({ desc: 'The AWS S3 Bucket name to use for file uploads.', default: 'p1-cms-cuf-uploads' }),
  MONGO_DSN: nonemptystr({ desc: 'The MongoDB DSN to connect to.', default: 'mongodb://mongo/cuf' }),
  NOTIFICATION_TO: email({ desc: 'The email address notifications are sent to.' }),
  SENDGRID_API_KEY: nonemptystr({ desc: 'The SendGrid API key for sending email.' }),
  SENDGRID_FROM: nonemptystr({ desc: 'The from name to use when sending email via SendGrid, e.g. Foo <foo@bar.com>', default: 'no-reply@parameter1.com' }),
  FETCH_TIMEOUT: num({ desc: 'The limit (in ms) for request processing', default: 10000 }),
  // Tenant-specific settings
  BASE4_API_URL: url({ desc: 'The management uri for the related platform tenant.' }),
  GRAPHQL_URI: url({ desc: 'The URI to access the BaseCMS GraphQL instance' }),
  TENANT_KEY: nonemptystr({ desc: 'The tenant key to use with the BaseCMS GraphQL instance' }),
  // Optional settings
  LOGO_URL: str({ desc: 'If configured, will be replace the branding in the navigation.', default: '' }),
  LEADERSHIP_ENABLED: bool({ desc: 'If the leadership section should be displayed', default: true }),
  PROMOTIONS_ENABLED: bool({ desc: 'If the promotions section should be displayed', default: false }),
  LEADERSHIP_CATEGORY_PREFIX: str({ desc: 'The prefix to use with categories for leadership sections.', default: 'leadership' }),
  LEADERSHIP_COMPANY_LABEL: str({ desc: 'If set check that a company has this label to enable the Leaders section.', default: '' }),
  LEADERSHIP_SECTION_ALIAS: nonemptystr({ desc: 'The leadership section alias to be displayed', default: 'leaders' }),
  LEADERSHIP_SECTION_MAX: num({ desc: 'The maximum number of leadership sections that can be selected per site.', default: 3 }),
  LEADERSHIP_PRIMARY_SITE_ONLY: bool({ desc: 'If leadership sections should be limited to content primary site.', default: false }),
  CONTACT_URL: str({ desc: 'If configured, the URL that will be added to the navigation for support requests.', default: '' }),
  CONTACT_TEXT: str({ desc: 'Link text for navigation element', default: 'Contact Us' }),
  APP_LOCALE: str({ desc: 'The application locale', choices: ['en-us', 'es-mx'], default: 'en-us' }),
  PORT: port({ desc: 'The port to listen on', default: 80 }),
  EXPOSED_PORT: port({ desc: 'The exposed port to listen on', default: 5550 }),
});
