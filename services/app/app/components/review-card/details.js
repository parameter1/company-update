import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';
import ReviewCard from '../review-card';

export default ReviewCard.extend({
  title: 'Company Details',
  teaser: computed('model.teaser', function() {
    return htmlSafe(this.get('model.teaser'));
  }),
  body: computed('model.body', function() {
    return htmlSafe(this.get('model.body'));
  }),
});
