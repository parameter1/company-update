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
  // Infrastructure configs
  EXPOSED_PORT: port({ desc: 'The exposed port to listen on', default: 5550 }),
  FETCH_TIMEOUT: num({ desc: 'The limit (in ms) for request processing', default: 10000 }),
  PORT: port({ desc: 'The port to listen on', default: 80 }),
  // Core mandatory configs
  AWS_ACCESS_KEY_ID: nonemptystr({ desc: 'The AWS access key value.' }),
  AWS_SECRET_ACCESS_KEY: nonemptystr({ desc: 'The AWS secret access key value.' }),
  AWS_S3_BUCKET: nonemptystr({ desc: 'The AWS S3 Bucket name to use for file uploads.', default: 'p1-cms-cuf-uploads' }),
  MONGO_DSN: nonemptystr({ desc: 'The MongoDB DSN to connect to.', default: 'mongodb://mongo/cuf' }),
  NOTIFICATION_TO: email({ desc: 'The email address notifications are sent to.' }),
  SENDGRID_API_KEY: nonemptystr({ desc: 'The SendGrid API key for sending email.' }),
  SENDGRID_FROM: nonemptystr({ desc: 'The from name to use when sending email via SendGrid, e.g. Foo <foo@bar.com>', default: 'no-reply@parameter1.com' }),
  // Tenant-specific settings
  BASE4_API_URL: url({ desc: 'The management uri for the related platform tenant.' }),
  GRAPHQL_URI: url({ desc: 'The URI to access the BaseCMS GraphQL instance' }),
  TENANT_KEY: nonemptystr({ desc: 'The tenant key to use with the BaseCMS GraphQL instance' }),
  // Optional settings
  DIRECTORY_ENABLED: bool({ desc: 'If the directory section should be displayed', default: false }),
  DIRECTORY_CATEGORY_IDS: str({ desc: 'CSV list of category taxonomy ids to display', default: '' }),
  DIRECTORY_SELECTION_MAX: num({ desc: 'The maximum number of children that can be selected per category. Set 0 to disable', default: 0 }),
  DIRECTORY_SECTIONS_ENABLED: bool({ desc: 'If the online directory section should be displayed', default: false }),
  DIRECTORY_SECTIONS_ALIAS: nonemptystr({ desc: 'The online directory section alias to be displayed, can include multiple by separating each with |', default: 'directory' }),
  DIRECTORY_SECTIONS_PRIMARY_SITE_ONLY: bool({ desc: 'If online directory sections should be limited to content primary site.', default: false }),
  DIRECTORY_SECTIONS_SCHEDULED_SITE_ONLY: bool({ desc: 'If online directory sections should be limited sites that have schedules.', default: false }),
  DOCUMENTS_ENABLED: bool({ desc: 'Whether or not document submissions are enabled/allowed', default: false }),
  DOCUMENT_LABEL_OPTION: str({ desc: 'The label to allow application of as applicable (Ex: Brochure/Presentation)', default: '' }),
  LOGO_URL: str({ desc: 'If configured, will be replace the branding in the navigation.', default: '' }),
  CONTACTS_ENABLED: bool({ desc: 'If the contacts section should be displayed', default: true }),
  COMPANY_SERVICES_FIELDS_ENABLED: bool({ desc: 'If the Services, Products and Warranty section of the company panel should be shown', default: true }),
  COMPANY_DETAILS_EXTRA_FIELDS_ENABLED: bool({ desc: 'If the fields: number of employees, years in operations, sales regions and sales channels should be shown on the companyt panel', default: true }),
  LEADERSHIP_ENABLED: bool({ desc: 'If the leadership section should be displayed', default: true }),
  PROMOTIONS_ENABLED: bool({ desc: 'If the promotions section should be displayed', default: false }),
  LEADERSHIP_CATEGORY_PREFIX: str({ desc: 'The prefix to use with categories for leadership sections.', default: 'leadership' }),
  LEADERSHIP_COMPANY_LABEL: str({ desc: 'If set check that a company has this label to enable the Leaders section.', default: '' }),
  LEADERSHIP_SECTION_ALIAS: nonemptystr({ desc: 'The leadership section alias to be displayed', default: 'leaders' }),
  LEADERSHIP_SECTION_MAX: num({ desc: 'The maximum number of leadership sections that can be selected per site.', default: 3 }),
  LEADERSHIP_PRIMARY_SITE_ONLY: bool({ desc: 'If leadership sections should be limited to content primary site.', default: false }),
  LEADERSHIP_SCHEDULED_SITES_ONLY: bool({ desc: 'If leadership sections should be limited sites that have schedules.', default: false }),
  LEADERSHIP_ALLOW_CATEGORY_REMOVAL: bool({ desc: 'If leadership sections are allowed to be removed', default: true }),
  COMPANY_CUSTOM_ATTRIBUTES: str({ desc: 'Custom attribute definitions (key, category, label, description', default: '[]' }),
  CONTACT_URL: str({ desc: 'If configured, the URL that will be added to the navigation for support requests.', default: '' }),
  CONTACT_TEXT: str({ desc: 'Link text for navigation element', default: 'Contact Us' }),
  PORTAL_PAGE_VERBIAGE: str({ desc: 'Alternative verbiage to display on the portal landing page', default: '' }),
  COMPANY_DETAILS_VERBIAGE: str({ desc: 'Alternative verbiage to display on the company details modification page', default: '' }),
  PROMOTIONS_VERBIAGE: str({ desc: 'Alternative verbiage to display on the company promotion modification page', default: '' }),
  REQUIRED_COMPANY_FIELDS: str({ desc: 'Fields that are required to be filled in on the company details modification page', default: '' }),
  APP_LOCALE: str({ desc: 'The application locale', choices: ['en-us', 'es-mx'], default: 'en-us' }),
});
