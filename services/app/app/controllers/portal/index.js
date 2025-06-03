import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default Controller.extend({

  leadershipEnabled: computed('config.{leadershipEnabled}', 'model.{websiteSchedules.[]}', function() {
    const hasSchedules = this.model.websiteSchedules && this.model.websiteSchedules.length;
    const schedules = hasSchedules ? this.model.websiteSchedules
      .filter((schedule) => schedule.section.alias === this.config.leadershipSectionAlias) : [];
    return this.config.leadershipEnabled || schedules.length;
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
    const hasSchedules = this.model.websiteSchedules && this.model.websiteSchedules.length;
    const schedules = hasSchedules ? this.model.websiteSchedules
      .filter((schedule) => schedule.section.alias === this.config.leadershipSectionAlias) : [];
    return this.config.leadershipPromotionsEnabled || schedules.length;
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
