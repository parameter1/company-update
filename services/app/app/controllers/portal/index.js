import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

  leadershipEnabled: computed('config.{leadershipEnabled,leadershipCompanyLabel}', 'model.labels.[]', function() {
    // disable leadership Categories if not enabled
    if(!this.config.leadershipEnabled) return false;
    // if the isLeader field is present and is a boolean
    if (typeof this.model.isLeader === 'boolean') {
      return this.model.isLeader;
    }
    // if company label is configured return the leadershipEnabled setting from the config
    if(this.config.leadershipCompanyLabel) {
      // check that the company label is in the array of labels for this company
      return this.model.labels.includes(this.config.leadershipCompanyLabel);
    }
    return true;
  }),
  directoryEnabled: computed('config.{directoryEnabled,directoryCategoryIds}', function () {
    return this.config.directoryEnabled && this.config.directoryCategoryIds.length;
  }),
  promotionsEnabled: computed.reads('config.leadershipPromotionsEnabled'),
  categoryPrefix: computed.reads('config.leadershipCategoryPrefix'),
});
