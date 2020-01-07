const p = v => `<p style="text-align:center; margin: 2em">${v}</p>`;
const header = ({ logo }) => `
<div style="width:100%; box-sizing: border-box; background-color: #17141F; color: #FFF; text-align:center; padding: 2em">
  ${logo ? `<img src="${logo}" alt="Publisher logo">` : '<h2>Content Portal</h2>'}
</div>
`;
const footer = ({ contactUrl, contactText }) => `
<p style="text-align:center; font-size: 0.8em; color: #ccc; margin: 2em">
  This email was sent from an automated system because your email address was supplied.<br>
  Please do not reply to this email. ${contactUrl ? `To contact someone, click here: <a href="${contactUrl}">${contactText}</a>.` : ''}
</p>
`;

module.exports = (template, args = {}) => {
  const {
    uri,
    logo,
    contactUrl,
    contactText,
    submission: {
      _id,
      type,
    } = {},
  } = args;

  const templates = {
    notify: `
      ${header({ logo })}

      ${p('A user has requested changes to a company or related content.')}
      ${p(`To view these changes, please <a href="${uri}/review/${_id}/${type}">click here</a>.`)}

      ${footer({ contactUrl, contactText })}
    `,
    thankYou: `
      ${header({ logo })}

      ${p('Thank you for your submission.')}
      ${p('Please let us know if you need anything further.')}

      ${footer({ contactUrl, contactText })}
    `,
  };
  return templates[template];
};
