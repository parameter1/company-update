import Controller from '@ember/controller';
import { computed, set } from '@ember/object';

export default Controller.extend({
  isModalOpen: false,

  contacts: computed('model.[]', function() {
    return this.get('model.publicContacts.edges').map(({ node }) => {
      const { id, firstName, lastName, title, primaryImage } = node;
      return { id, firstName, lastName, title, primaryImage };
    });
  }),

  isSubmitDisabled: computed.not('isModified'),
  isModified: computed('payload.{add.length,remove.length,update.length}', function() {
    const adds = this.get('payload.add.length');
    const removes = this.get('payload.remove.length');
    const updates = this.get('payload.update.length');
    return adds > 0 || removes > 0 || updates > 0;
  }),

  init() {
    this._super(...arguments);
    this.set('payload', {
      add: [],
      remove: [],
      update: [],
    });
  },

  getUpdate(id) {
    const found = this.get('payload.update').find((c) => c.id === id);
    if (!found) {
      const newObj = { id };
      this.get('payload.update').pushObject(newObj);
      return newObj;
    }
    return found;
  },

  actions: {
    showModal() {
      this.set('isModalOpen', true);
    },
    add() {
      const contact = {};
      this.contacts.pushObject(contact);
      this.payload.add.pushObject(contact);
    },
    remove(contact) {
      this.contacts.removeObject(contact);
      if (contact.id) {
        this.payload.remove.pushObject(contact.id);
      } else {
        this.payload.add.removeObject(contact);
      }
    },
    update({ id }, field, value) {
      if (id) {
        const entry = this.getUpdate(id);
        set(entry, field, value);
      }
    },
    reset({ id }, field) {
      if (id) {
        const entry = this.getUpdate(id);
        delete entry[field];
        if (Object.keys(entry).length === 1) this.payload.update.removeObject(entry);
      }
    },
    transitionToPortal() {
      this.transitionToRoute('portal');
    },
  }
});
