import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { inject } from '@ember/service';

export default Controller.extend({
  config: inject(),

  isModalOpen: false,

  submitDisabled: computed('config.requiredCompanyFields', 'model', function() {
    const requiredFields = this.config.requiredCompanyFields || [];
    const requiredValuesSet = requiredFields.map((fieldName) => this.get(`model.${fieldName}`)).filter((v) => v);
    return requiredFields.length !== requiredValuesSet.length;
  }),

  logo: computed.reads('model.primaryImage.src'),
  companyDetailsVerbiage: computed('config.companyDetailsVerbiage', function() {
    if (this.config.companyDetailsVerbiage) {
      return htmlSafe(this.config.companyDetailsVerbiage)
    }
    return null;
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
    onChange() {
      this.notifyPropertyChange('submitDisabled');
    }
  }
});
