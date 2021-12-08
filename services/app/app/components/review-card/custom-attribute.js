import { computed } from '@ember/object';
import ReviewCard from '@base-cms/company-update-app/components/review-card';

export default ReviewCard.extend({
  tagName: 'div',
  classNames: ['row'],
  targetId: computed('key', function() {
    return `${this.key}-input`;
  }),
  i18nLabel: computed('key', function() {
    return `customAttributes.${this.key}Label`;
  }),
  oldValue: computed('key', 'company', function() {
    return this.get(`company.${this.key}`);
  }),

  newValue: computed('key', 'submission', function() {
    return this.get(`submission.payload.customAttributes.${this.key}`);
  }),

  isInPayload: computed('key', 'payload.customAttributes', function() {
    // @todo support deep object access for attrs, youtube, etc.
    // return this.get(`payload.${this.key}`);
    return this.get('payload.customAttributes');
  }),
});
