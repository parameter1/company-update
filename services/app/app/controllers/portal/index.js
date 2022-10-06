import Controller from '@ember/controller';
import { computed } from '@ember/object';

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
  promotionsEnabled: computed.reads('config.leadershipPromotionsEnabled'),
  categoryPrefix: computed.reads('config.leadershipCategoryPrefix'),
});
