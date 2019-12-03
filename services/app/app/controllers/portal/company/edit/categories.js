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
  selected: computed.reads('model.company.sectionIds'),
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
      this.transitionToRoute('portal.company.edit');
    },
    select(node) {
      this.get('model.company.sectionIds').push(parseInt(node.id));
      const unique = this.get('model.company.sectionIds').filter((v, i, a) => a.indexOf(v) === i);
      this.set('model.company.sectionIds', unique);
    },
    deselect(node) {
      const unique = this.get('model.company.sectionIds').filter((v, i, a) => a.indexOf(v) === i);
      const toSet = unique.filter(v => v !== parseInt(node.id));
      this.set('model.company.sectionIds', toSet);
    },
  }
});
