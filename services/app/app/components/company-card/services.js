import Component from '@ember/component';
import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';

const toolbarButtons = [['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript']];

export default Component.extend({
  tagName: 'div',
  classNames: ['card mb-3'],
  title: 'Services, Products, and Warranty Information',
  toolbarButtons,
  productSummary: computed('model.productSummary', function () {
    return htmlSafe(this.get('model.productSummary'));
  }),
  trainingInformation: computed('model.trainingInformation', function () {
    return htmlSafe(this.get('model.trainingInformation'));
  }),
  servicesProvided: computed('model.servicesProvided', function () {
    return htmlSafe(this.get('model.servicesProvided'));
  }),
  warrantyInformation: computed('model.warrantyInformation', function () {
    return htmlSafe(this.get('model.warrantyInformation'));
  }),
  serviceInformation: computed('model.serviceInformation', function () {
    return htmlSafe(this.get('model.serviceInformation'));
  }),
});
