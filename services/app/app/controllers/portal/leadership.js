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
