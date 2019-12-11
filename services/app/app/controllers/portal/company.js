import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

  isModalOpen: false,

  logo: computed.reads('model.primaryImage.src'),

  actions: {
    showModal() {
      this.set('model.logo', this.get('model.primaryImage.src'));
      this.set('isModalOpen', true);
    },
    transitionToThankYou() {
      this.transitionToRoute('portal.thanks');
    },
  }
});
