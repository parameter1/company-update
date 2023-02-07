import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default Controller.extend({

  isModalOpen: false,

  logo: computed.reads('model.primaryImage.src'),
  companyDetailsVerbiage: computed('config.companyDetailsVerbiage', function() {
    return htmlSafe(this.config.companyDetailsVerbiage)
  }),

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
