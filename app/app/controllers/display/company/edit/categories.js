import Controller from '@ember/controller';
import { computed } from '@ember/object';

// eslint-disable-next-line arrow-body-style
const flatten = (sections, selected = []) => {
  const { edges } = sections || { edges: [] };
  return edges.map(({ node: { id, name, children } }) => {
    const state = { selected: selected.includes(id) };
    const flat = flatten(children, selected);
    return { id, text: name, children: flat, state  };
  });
};

export default Controller.extend({
  selectedIds: computed('model.company.scheduledWebsiteSections.edges', function() {
    return this.get('model.company.scheduledWebsiteSections.edges').map(({ node }) => node.id);
  }),
  selected: computed.reads('selectedIds'),
  sections: computed('model.sections.[],selected.[]', function() {
    return flatten(this.get('model.sections'), this.get('selected'));
  }),

  init() {
    this._super(...arguments);
    this.set('checkboxOptions', {
      three_state: false,
      cascade: 'undetermined',
    });
  },

  actions: {
    transitionToEdit() {
      this.transitionToRoute('display.company.edit');
    },
    select(node) {
      if (!this.get('model.company.sectionIds')) this.set('model.company.sectionIds', this.get('selected'));
      this.get('model.company.sectionIds').push(parseInt(node.id));
    },
    deselect(node) {
      if (!this.get('model.company.sectionIds')) this.set('model.company.sectionIds', this.get('selected'));
      this.set('model.company.sectionIds', this.get('selected').without(node.id));
    },
  }
});
