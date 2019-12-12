import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { inject } from '@ember/service';
import ActionMixin from '../../mixins/action';

export default Component.extend(ActionMixin, {
  config: inject(),
  notify: inject(),
  classNames: ['col-12 mb-3'],
  site: null,

  init() {
    this._super(...arguments);
    this.set('_selected', []);
  },

  section: computed('site.sections.edges.[]', function() {
    const section = (get(this, 'site.sections.edges') || []).firstObject;
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
