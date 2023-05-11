import Component from '@ember/component';
import { computed, get } from '@ember/object';

const { error } = console;

const getOwnedIds = (obj, ids = []) => {
  const edges = obj || [];
  if (Array.isArray(edges)) {
    return edges.reduce((arr, node) => [
      ...arr,
      node.id,
      ...(node.children ? getOwnedIds(node.children) : []),
    ], ids);
  }
  return [];
};

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

  _selected: computed('selectedIds.[]', 'node.{id,children.[]}', function() {
    const ids = this.selectedIds || [];
    const children = get(this, 'node.children') || [];
    const ownedIds = getOwnedIds(children);
    return ids.filter(id => ownedIds.includes(id));
  }),

  rootClass: computed('root', function() {
    return this.root ? 'tree-inner' : '';
  }),

  checked: computed('selectedIds.[]', 'node.id', function() {
    const ids = this.selectedIds || [];
    const id = this.node.id;
    return ids.includes(id);
  }),

  selected: computed.reads('_selected.length'),

  actions: {
    collapse() {
      this.set('collapsed', !this.collapsed);
    },
    update() {
      this.onUpdate(this.node.id);
    },
  },
});
