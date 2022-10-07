import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { inject } from '@ember/service';
import ActionMixin from '@base-cms/company-update-app/mixins/action';

const getOwnedIds = (obj, ids = []) => {
  const edges = get(obj, 'edges') || [];
  return edges.reduce((arr, { node }) => [
    ...arr,
    node.id,
    ...(node.children ? getOwnedIds(node.children) : []),
  ], ids);
};

export default Component.extend(ActionMixin, {
  config: inject(),
  notify: inject(),
  classNameBindings: ['root:tree-wrapper', 'root:border', 'root:p-2'],
  node: null,
  collapsed: true,
  root: false,

  init() {
    this._super(...arguments);
  },

  _selected: computed('selectedIds.[]', 'node.{id,children.[]}', function() {
    const ids = this.selectedIds || [];
    const children = get(this, 'node.children') || [];
    const ownedIds = getOwnedIds(children);
    return ids.filter(id => ownedIds.includes(id));
  }),

  canSelect: computed('node.children.[]', function() {
    if (!this.node.children) return true;
    return !this.node.children.length;
  }),

  selected: computed.reads('_selected.length'),
  maximum: computed.reads('config.directorySelectionMax'),

  rootClass: computed('root', function() {
    return this.root ? 'tree-inner' : '';
  }),

  actions: {
    collapse() {
      this.set('collapsed', !this.collapsed);
    },
    toggle(id) {
      const selected = this.get('_selected');
      if (selected.includes(id)) {
        selected.removeObject(id);
      } else {
        selected.pushObject(id);
      }
      this.onUpdate(id);
    },
  },
});
