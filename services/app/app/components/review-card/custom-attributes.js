import ReviewCard from '@base-cms/company-update-app/components/review-card';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default ReviewCard.extend({
  config: inject(),
  tagName: '',
  classNames: [],
  groups: computed('config.companyCustomAttributes', function() {
    const attrs = this.get('config.companyCustomAttributes') || [];
    const groups = attrs.reduce((obj, attr) => {
      const { category = 'null' } = attr;
      return { ...obj, [category]: [...(obj[category] || []), attr] };
    }, {});
    return Object.keys(groups).map(key => ({ title: key, attrs: groups[key] }));
  }),
});
