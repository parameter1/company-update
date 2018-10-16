import Controller from '@ember/controller';
import { computed } from '@ember/object';

// eslint-disable-next-line arrow-body-style
const flatten = (sections) => {
  const { edges } = sections || { edges: [] };
  return edges.map(({ node: { id, name, children } }) => {
    const flat = flatten(children);
    return { id, name, children: flat };
  });
};

export default Controller.extend({
  sections: computed('model', function() {
    return flatten(this.get('model'));
  }),

  actions: {
    transitionToEdit() {
      this.transitionToRoute('display.company.edit');
    }
  }
});
