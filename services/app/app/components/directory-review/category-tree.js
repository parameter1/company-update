import Component from '@ember/component';
import { computed } from '@ember/object';

const { error } = console;

export default Component.extend({
  classNameBindings: ['root:tree-wrapper', 'root:border', 'root:p-2'],
  node: null,
  root: false,
  onUpdate: () => error('onUpdate missing!'),

  rootClass: computed('root', function() {
    return this.root ? 'tree-inner' : '';
  }),

  labelClass: computed('wasAdded', 'wasRemoved', 'node.children', 'checked', function() {
    const classes = ['d-flex', 'align-items-center'];
    // if (!this.wasModified && !this.get('node.children.length')) classes.push('text-muted');
    if (this.wasAdded) classes.push(this.checked ? 'text-success' : 'text-muted');
    if (this.wasRemoved) classes.push(this.checked ? 'text-danger' : 'text-muted');
    return classes.join(' ');
  }),

  wasModified: computed.or('wasAdded', 'wasRemoved'),

  wasAdded: computed('addedIds.[]', 'node.id', function() {
    const ids = this.addedIds || [];
    const { id } = this.node;
    return ids.includes(id);
  }),

  wasRemoved: computed('removedIds.[]', 'node.id', function() {
    const ids = this.removedIds || [];
    const { id } = this.node;
    return ids.includes(id);
  }),

  checked: computed('selectedIds.[]', 'node.id', function() {
    const ids = this.selectedIds || [];
    const { id } = this.node;
    return ids.includes(id);
  }),

  cChecked: computed('contentIds.[]', 'node.id', function() {
    const ids = this.contentIds || [];
    const { id } = this.node;
    return ids.includes(id);
  }),

  actions: {
    update() {
      this.onUpdate(this.node.id);
    },
  },
});
