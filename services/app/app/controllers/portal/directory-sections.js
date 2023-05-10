import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  config: inject(),

  isModalOpen: false,
  hash: null,

  submitDisabled: computed('sections.[]', function() {
    return this.get('sections.length') === 0;
  }),

  init() {
    this._super(...arguments);
    this.set('sections', []);
  },

  actions: {
    update(id) {
      const sections = this.get('sections');
      if (sections.includes(id)) {
        sections.removeObject(id);
      } else {
        sections.pushObject(id);
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
