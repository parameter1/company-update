import { computed, get } from '@ember/object';
import ReviewCard from '@base-cms/company-update-app/components/review-card';

export default ReviewCard.extend({
  title: 'Social Media',

  links: computed('company.socialLinks', 'submission.payload.socialLinks', function() {
    const cl = get(this, 'company.socialLinks') || [];
    const sl = get(this, 'submission.payload.socialLinks') || [];
    return sl.map((v, i) => ({ original: cl[i] ? cl[i] : {}, updated: v }));
  }),

  actions: {
    add() {
      this.get('links').pushObject({});
    },
    remove(link) {
      this.get('links').removeObject(link);
    }
  },
});
