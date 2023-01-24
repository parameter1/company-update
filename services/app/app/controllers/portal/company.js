import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

  isModalOpen: false,

  logo: computed.reads('model.primaryImage.src'),
  companyDetailsVerbiage: computed.reads('config.companyDetailsVerbiage'),

  actions: {
    showModal() {
      this.set('model.logo', this.get('model.primaryImage.src'));
      this.set('isModalOpen', true);
    },
    transitionToPortal() {
      this.transitionToRoute('portal');
    },
    onUpload(src) {
      this.set('model.primaryImage', { src });
    },
  }
});
