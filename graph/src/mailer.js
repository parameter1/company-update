const sgMail = require('@sendgrid/mail');
const { notifyTemplate, thankyouTemplate } = require('./templates');
const {
  SENDGRID_API_KEY,
  SENDGRID_FROM,
  NOTIFICATION_TO,
  PLATFORM_LOGO,
  PLATFORM_URI,
} = require('./env');

const fillTemplate = async (template, replacements = {}) => {
  let out = template;
  const logo = PLATFORM_LOGO;
  const uri = PLATFORM_URI;
  const toReplace = { logo, uri, ...replacements };
  await Object.keys(toReplace).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(toReplace, key)) {
      out = out.replace(new RegExp(`__${key}__`, 'g'), toReplace[key]);
    }
  });
  return out;
};

const send = ({ to, subject, html }) => {
  const payload = {
    to,
    from: SENDGRID_FROM,
    subject,
    html,
  };

  sgMail.setApiKey(SENDGRID_API_KEY);
  const promise = sgMail.send(payload);
  promise.catch((e) => { throw e; });
  return promise;
};

module.exports = {
  async notify({ _id, name, email }) {
    const subject = 'A new listing update requires review';
    const html = await fillTemplate(notifyTemplate, { _id, name, email });
    const to = NOTIFICATION_TO;
    return send({ to, subject, html });
  },
  async thank({ _id, name, email }) {
    const subject = 'Your requested listing updates have been recieved';
    const html = await fillTemplate(thankyouTemplate, { _id, name, email });
    const to = `${name} <${email}>`;
    return send({ to, subject, html });
  },
};
