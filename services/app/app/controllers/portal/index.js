import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default Controller.extend({

  leadershipEnabled: computed('config.{leadershipEnabled,leadershipCompanyLabel}', 'model.{labels.[]}', function() {
    // disable leadership Categories if not enabled
    if(!this.config.leadershipEnabled) return false;
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
  directorySectionsEnabled: computed('config.{directorySectionsEnabled,directorySectionsAlias}', function() {
    return this.config.directorySectionsEnabled && this.config.directorySectionsAlias;
  }),
  documentsEnabled: computed('config.documentsEnabled', function() {
    return this.config.documentsEnabled;
  }),
  promotionsEnabled: computed('config.leadershipPromotionsEnabled', function() {
    return this.config.leadershipPromotionsEnabled;
  }),
  contactsEnabled: computed('config.contactsEnabled', function () {
    return this.config.contactsEnabled
  }),
  categoryPrefix: computed.reads('config.leadershipCategoryPrefix'),
  portalPageVerbiage: computed('config.portalPageVerbiage', function() {
    if (this.config.portalPageVerbiage) {
      return htmlSafe(this.config.portalPageVerbiage);
    }
    return null;
  }),
});
