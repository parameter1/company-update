import Component from '@ember/component';
import { computed } from '@ember/object';
import { getAsArray } from '@base-cms/object-path';

export default Component.extend({
  classNames: ['card-body row'],
  category: null,

  sections: computed('category.children.edges.[]', function() {
    const sections = getAsArray(this.get('category.children.edges'));
    return sections.map(({ node }) => node);
  }),
});
