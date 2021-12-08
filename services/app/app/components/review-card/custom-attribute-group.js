import { computed } from '@ember/object';
import ReviewCard from '@base-cms/company-update-app/components/review-card';

export default ReviewCard.extend({
  categoryName: computed('title', function() {
    const title = this.title;
    return title !== 'null' ? title : '';
  }),
});
