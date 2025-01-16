import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import ReviewCard from '@base-cms/company-update-app/components/review-card';

export default ReviewCard.extend({
  config: inject(),
  companyDetailsExtraFieldsEnabled: computed.reads('config.companyDetailsExtraFieldsEnabled'),
  teaser: computed('model.teaser', function() {
    return htmlSafe(this.get('model.teaser'));
  }),
  body: computed('model.body', function() {
    return htmlSafe(this.get('model.body'));
  }),
});
