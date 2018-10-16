import Controller from '@ember/controller';
import { computed } from '@ember/object';

// eslint-disable-next-line arrow-body-style
const flatten = (sections, selected = []) => {
  const { edges } = sections || { edges: [] };
  return edges.map(({ node: { id, name, children } }) => {
    const state = { selected: selected.includes(id) };
    const flat = flatten(children, selected);
    return { id, text: name, children: flat, state, icon: '' };
  });
};

export default Controller.extend({
  selected: computed.reads('model.company.sectionIds'), // pull from model

  sections: computed('model.sections.[],selected.[]', function() {
    return flatten(this.get('model.sections'), this.get('selected'));
  }),

  checkboxOptions: {
    // three_state: false,
    // deselect_all: true,
    // cascade: 'up',
  },

  actions: {
    transitionToEdit() {
      this.transitionToRoute('display.company.edit');
    },
    select(node) {
      this.get('model.company.sectionIds').push(node.id);
    },
    deselect(node) {
      this.set('model.company.sectionIds', this.get('selected').without(node.id));
    },
  }
});
