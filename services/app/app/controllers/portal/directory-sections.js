import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  config: inject(),

  isModalOpen: false,
  hash: null,

  submitDisabled: computed('payload.{added,removed}', function() {
    const { added, removed } = this.get('payload');
    return added.length === 0 && removed.length === 0;
  }),

  payload: computed('selected.[]', 'initial.[]', function() {
    const { selected, initial } = this.getProperties('selected', 'initial');
    const payload = { removed: [], added: [] };
    selected.forEach((id) => {
      if (!initial.includes(id)) payload.added.push(id);
    });
    initial.forEach((id) => {
      if (!selected.includes(id)) payload.removed.push(id);
    });
    return payload;
  }),

  init() {
    this._super(...arguments);
    this.set('selected', []);
    this.set('initial', []);
  },

  actions: {
    update(id) {
      const selected = this.get('selected');
      if (selected.includes(id)) {
        selected.removeObject(id);
      } else {
        selected.pushObject(id);
      }
    },
    showModal() {
      this.set('isModalOpen', true);
    },
    transitionToPortal() {
      this.transitionToRoute('portal');
    },
  }
});
