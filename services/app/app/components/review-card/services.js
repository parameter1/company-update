import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';
import ReviewCard from '@base-cms/company-update-app/components/review-card';

export default ReviewCard.extend({
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
