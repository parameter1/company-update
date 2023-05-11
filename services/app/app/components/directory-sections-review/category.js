import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['card-body row'],
  category: null,

  sections: computed('category.children.edges.[]', function() {
    const sections = this.get('category.children.edges') || [];
    return sections.map(({ node }) => node);
  }),
});
