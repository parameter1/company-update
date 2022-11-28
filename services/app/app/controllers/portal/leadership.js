import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  config: inject(),

  isModalOpen: false,
  hash: null,

  submitDisabled: computed('categories.[]', function() {
    return this.get('categories.length') === 0;
  }),

  leadershipEnabled: computed('config.{leadershipEnabled,leadershipCompanyLabel}', 'model.contentHash.{labels.[]}', function() {
    // disable leadership Categories if not enabled
    if(!this.config.leadershipEnabled) return false;
    // if company label is configured return the leadershipEnabled setting from the config
    if(this.config.leadershipCompanyLabel) {
      // check that the company label is in the array of labels for this company
      return this.model.contentHash.labels.includes(this.config.leadershipCompanyLabel);
    }
    return true;
  }),

  categoryPrefix: computed.reads('config.leadershipCategoryPrefix'),

  init() {
    this._super(...arguments);
    this.set('categories', []);
  },

  actions: {
    update(id) {
      const categories = this.get('categories');
      if (categories.includes(id)) {
        categories.removeObject(id);
      } else {
        categories.pushObject(id);
      }
    },
    showModal() {
      this.set('isModalOpen', true);
    },
    transitionToPortal() {
      this.transitionToRoute('portal');
    },
  }
});
