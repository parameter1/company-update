import Controller from 'cuf/controllers/display/company';
import { computed } from '@ember/object';

export default Controller.extend({
  isModalOpen: false,

  logo: computed.reads('model.primaryImage.src'),

  title: computed('model', function() {
    return `${this.get('model.name')}`;
  }),

  actions: {
    showModal() {
      this.set('model.logo', this.get('logo'));
      this.set('isModalOpen', true);
    },
    transitionToThankYou() {
      this.transitionToRoute('display.company.thanks');
    },
  }
});
