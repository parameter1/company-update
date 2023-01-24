import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default Controller.extend({

  leadershipEnabled: computed('config.{leadershipEnabled,leadershipCompanyLabel}', 'model.labels.[]', function() {
    // disable leadership Categories if not enabled
    if(!this.config.leadershipEnabled) return false;
    // if no company lable configured return the leadershipEnabled setting from the config
    if(!this.config.leadershipCompanyLabel) return this.config.leadershipEnabled;
    // check that the company label is in the array of labels for this company
    return(this.model.labels.includes(this.config.leadershipCompanyLabel));
  }),
  directoryEnabled: computed('config.{directoryEnabled,directoryCategoryIds}', function () {
    return this.config.directoryEnabled && this.config.directoryCategoryIds.length;
  }),
  promotionsEnabled: computed('config.leadershipPromotionsEnabled', function() {
    return this.config.leadershipPromotionsEnabled;
  }),
  contactsEnabled: computed('config.contactsEnabled', function () {
    return this.config.contactsEnabled
  }),
  categoryPrefix: computed.reads('config.leadershipCategoryPrefix'),
  portalPageVerbiage: computed('config.portalPageVerbiage', function() {
    return htmlSafe(this.config.portalPageVerbiage);
  }),
});
