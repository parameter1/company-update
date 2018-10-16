import Controller from 'cuf/controllers/display/company';
import { computed } from '@ember/object';

export default Controller.extend({
  isModalOpen: false,

  title: computed('model', function() {
    return `${this.get('model.name')}`;
  }),

  actions: {
    showModal() {
      this.set('isModalOpen', true);
    },
    transitionToThankYou() {
      this.transitionToRoute('display.company.thanks');
    },
  }
});
