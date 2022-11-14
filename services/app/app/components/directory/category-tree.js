import Component from '@ember/component';
import { computed } from '@ember/object';
import ActionMixin from '@base-cms/company-update-app/mixins/action';

const { error } = console;

export default Component.extend(ActionMixin, {
  classNameBindings: ['root:tree-wrapper', 'root:border', 'root:p-2'],
  node: null,
  root: false,
  onUpdate: () => error('onUpdate missing!'),

  rootClass: computed('root', function() {
    return this.root ? 'tree-inner' : '';
  }),

  checked: computed('selectedIds.[]', 'node.id', function() {
    const ids = this.selectedIds || [];
    const id = this.node.id;
    return ids.includes(id);
  }),

  collapsed: computed('node.children', function() {
    if (this.node.children.length) return true
    return false
  }),

  expandedState: computed('collapsed', function() {
    return !this.collapsed;
  }),

  collapsedState: computed('collapsed', function() {
    return this.collapsed;
  }),

  noChildren: computed('node.children', function() {
    if (this.node.children.length) return false;
    return true;
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
