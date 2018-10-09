const header = '<div style="width:100%; box-sizing: border-box; background-color: #2C3E50; color: #FFF; text-align:center; padding: 2em"><img src="__logo__" alt="Publisher logo" /></div>';
const footer = '<p style="text-align:center; font-size: 0.8em; color: #ccc; margin: 2em">This email was sent from an automated system becuase your email address was supplied.<br>Please do not reply to this email -- to contact someone, visit __uri__/contact_us</p>';
const textP = '<p style="text-align:center; margin: 2em">';
module.exports = {
  notifyTemplate: `${header} ${textP}A user has requested changes to a company or related content.</p>${textP}To view these changes, please <a href="__uri__/cu/display/company/__hash__/___id__">click here</a>.</p> ${footer}`,
  thankyouTemplate: `${header} ${textP}Thank you for updating your listing!</p>${textP}The submitted changes have been recieved and will be reviewed by our editorial staff.</p> ${footer}`,
};
