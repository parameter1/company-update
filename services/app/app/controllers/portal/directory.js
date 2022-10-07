import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  config: inject(),

  isModalOpen: false,
  hash: null,

  submitDisabled: computed('selected.[]', function() {
    return this.get('selected.length') === 0;
  }),

  categoryPrefix: computed.reads('config.leadershipCategoryPrefix'),

  init() {
    this._super(...arguments);
    this.set('selected', []);
  },

  actions: {
    update(id) {
      const selected = this.get('selected');
      if (selected.includes(id)) {
        selected.removeObject(id);
      } else {
        selected.pushObject(id);
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
