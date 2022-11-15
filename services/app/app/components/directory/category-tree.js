import Component from '@ember/component';
import { computed } from '@ember/object';

const { error } = console;

export default Component.extend({
  classNameBindings: ['root:tree-wrapper', 'root:border', 'root:p-2'],
  node: null,
  collapsed: false,
  root: false,
  init() {
    this._super(...arguments);
    this.collapsed = Boolean(this.node.children && this.node.children.length);
  },
  onUpdate: () => error('onUpdate missing!'),

  rootClass: computed('root', function() {
    return this.root ? 'tree-inner' : '';
  }),

  checked: computed('selectedIds.[]', 'node.id', function() {
    const ids = this.selectedIds || [];
    const id = this.node.id;
    return ids.includes(id);
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
