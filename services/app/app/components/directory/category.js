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

const mapEdgeNodes = ({ edges }) => edges.map(({ node }) => ({
  ...node,
  ...(node.children && node.children.totalCount && {
    children: mapEdgeNodes(node.children),
  }),
}));

export default Component.extend(ActionMixin, {
  config: inject(),
  notify: inject(),
  classNames: ['col-12 mb-3'],
  category: null,
  collapsed: true,

  init() {
    this._super(...arguments);
  },

  _selected: computed('selectedIds.[]', 'category.{id,children.[]}', function() {
    const ids = this.selectedIds || [];
    const children = get(this, 'category.children') || [];
    const ownedIds = getOwnedIds(children);
    return ids.filter(id => ownedIds.includes(id));
  }),

  children: computed('category.children.edges.[]', function() {
    const children = this.get('category.children') || [];
    return mapEdgeNodes(children);
  }),

  selected: computed.reads('_selected.length'),
  maximum: computed.reads('config.directorySelectionMax'),
  hasChildren: computed('children.[]', function() {
    return this.get('children').some(s => get(s, 'children.totalCount') > 0);
  }),
  canSelect: computed('selected', 'maximum', function() {
    return this.get('selected') < this.get('maximum');
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
