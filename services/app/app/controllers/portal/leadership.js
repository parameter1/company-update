import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  isModalOpen: false,
  hash: null,

  submitDisabled: computed('categories.[]', function() {
    return this.get('categories.length') === 0;
  }),

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
