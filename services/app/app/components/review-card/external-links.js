import { computed, get } from '@ember/object';
import ReviewCard from '@base-cms/company-update-app/components/review-card';

export default ReviewCard.extend({

  links: computed('company.externalLinks.[]', 'submission.payload.externalLinks.[]', function() {
    const cl = get(this, 'company.externalLinks') || [];
    const sl = get(this, 'submission.payload.externalLinks') || [];
    return sl.map((v, i) => ({ original: cl[i] ? cl[i] : {}, updated: v }));
  }),
});
