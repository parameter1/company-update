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
  classNames: ['col-12 mb-3'],
  site: null,
  collapsed: true,

  init() {
    this._super(...arguments);
  },

  _selected: computed('selectedIds.[]', 'site.{id,sections.[]}', function() {
    const ids = this.selectedIds || [];
    const sections = get(this, 'site.sections') || [];
    const ownedIds = getOwnedIds(sections);
    return ids.filter(id => ownedIds.includes(id));
  }),

  section: computed('site.sections.edges.[]', function() {
    const section = (get(this, 'site.sections.edges') || []).firstObject;
    if (!section) return null;
    return get(section, 'node');
  }),
  sections: computed('section.children.edges.[]', function() {
    const sections = this.get('section.children.edges') || [];
    return sections.map(({ node }) => node);
  }),

  selected: computed.reads('_selected.length'),
  maximum: computed.reads('config.leadershipSectionMax'),
  hasChildren: computed('sections.[]', function() {
    return this.get('sections').some(s => get(s, 'children.totalCount') > 0);
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
    }
  }

});
