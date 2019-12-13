import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  isModalOpen: false,

  contacts: computed('model.publicContacts.edges.[]', function() {
    return this.get('model.publicContacts.edges').map(({ node }) => node);
  }),

  actions: {
    showModal() {
      this.set('isModalOpen', true);
    },
    add() {
      this.contacts.pushObject({});
    },
    remove(contact) {
      this.contacts.removeObject(contact);
    },
    transitionToPortal() {
      this.transitionToRoute('portal');
    },
  }
});
