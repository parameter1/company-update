const sendMail = require('@mindful-web/marko-web-mindful-email');
const render = require('./templates');
const {
  EMAIL_FROM,
  NOTIFICATION_TO,
  LOGO_URL,
  CONTACT_URL,
  CONTACT_TEXT,
} = require('./env');

const common = {
  contactUrl: CONTACT_URL,
  contactText: CONTACT_TEXT,
  logo: LOGO_URL,
};

module.exports = {
  async notify(submission = {}, { req }) {
    const subject = 'A new company update requires review';
    const html = await render('notify', { ...common, uri: `http://${req.get('host')}`, submission });
    return sendMail({
      to: NOTIFICATION_TO,
      from: EMAIL_FROM,
      subject,
      html,
    });
  },
  async thank(submission, { req }) {
    const subject = 'Your requested updates have been received';
    const html = await render('thankYou', { ...common, uri: `http://${req.get('host')}`, submission });
    const { name, email } = submission;
    return sendMail({
      to: `${name} <${email}>`,
      from: EMAIL_FROM,
      subject,
      html,
    });
  },
};
