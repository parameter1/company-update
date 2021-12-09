import Component from '@ember/component';
import { get, computed } from '@ember/object';

export default Component.extend({
  tagName: 'fieldset',
  classNames: ['leadership-category', 'border', 'mb-2', 'p-2'],
  category: null,

  sections: computed('category.children.edges.[]', function() {
    const sections = this.get('category.children.edges') || [];
    return sections.map(({ node }) => node);
  }),

  isMaxDepth: computed('sections', function() {
    const sections = this.get('sections');
    const hasGrandchildren = sections.some((section) => get(section, 'children.totalCount') > 0);
    return !hasGrandchildren;
  }),
});
