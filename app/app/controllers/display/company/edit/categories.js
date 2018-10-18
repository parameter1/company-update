import Controller from '@ember/controller';
import { computed } from '@ember/object';

// eslint-disable-next-line arrow-body-style
const flatten = (sections, selected = []) => {
  const { edges } = sections || { edges: [] };
  return edges.map(({ node: { id, name, children } }) => {
    const state = { selected: selected.includes(id) };
    const flat = flatten(children, selected);
    return { id, icon: 'entypo icon-box text-muted', text: name, children: flat, state  };
  });
};

export default Controller.extend({
  selected: computed.reads('model.company.scheduledWebsiteSectionIds'),
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
      this.get('model.company.scheduledWebsiteSectionIds').push(parseInt(node.id));
    },
    deselect(node) {
      this.set('model.company.scheduledWebsiteSectionIds', this.get('selected').without(node.id));
    },
  }
});
