import Component from '@ember/component';
import { computed } from '@ember/object';
import ActionMixin from '@base-cms/company-update-app/mixins/action';

const { error } = console;

export default Component.extend(ActionMixin, {
  classNameBindings: ['root:tree-wrapper', 'root:border', 'root:p-2'],
  node: null,
  root: false,
  collapsed: true,
  onUpdate: () => error('onUpdate missing!'),

  rootClass: computed('root', function() {
    return this.root ? 'tree-inner' : '';
  }),

  checked: computed('selectedIds.[]', 'node.id', function() {
    const ids = this.selectedIds || [];
    const id = this.node.id;
    return ids.includes(id);
  }),

  expandedState: computed('node.children', 'collapsed', function() {
    const children = this.node ? this.node.children : [];
    // If there are children and collapsed is false, expandedState is true
    return children.length && !this.collapsed;
  }),

  actions: {
    collapse() {
      this.set('collapsed', !this.collapsed);
    },
    update() {
      this.onUpdate(this.node.id);
    },
  },
});
