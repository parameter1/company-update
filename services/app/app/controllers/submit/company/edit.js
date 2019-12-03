import Controller from 'cuf/controllers/submit/company';
import { computed } from '@ember/object';

export default Controller.extend({
  isModalOpen: false,

  logo: computed.reads('model.primaryImage.src'),

  title: computed('model', function() {
    return `${this.get('model.name')}`;
  }),

  actions: {
    showModal() {
      if (this.get('logo') !== this.get('model.primaryImage.src')) this.set('model.logo', this.get('logo'));
      this.set('isModalOpen', true);
    },
    transitionToThankYou() {
      this.transitionToRoute('submit.company.thanks');
    },
  }
});
