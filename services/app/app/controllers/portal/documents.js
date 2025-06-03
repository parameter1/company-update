import Controller from '@ember/controller';
import { computed, set } from '@ember/object';

export default Controller.extend({
  isModalOpen: false,
  count: 0,

  isSubmitDisabled: computed.not('isModified'),
  isModified: computed('payload.{add.length,remove.length,update.length}', function() {
    const adds = this.get('payload.add.length');
    const removes = this.get('payload.remove.length');
    const updates = this.get('payload.update.length');
    return adds > 0 || removes > 0 || updates > 0;
  }),

  generateId() {
    const count = this.get('count') || 0;
    this.set('count', count + 1);
    return `added-${count}`;
  },

  init() {
    this._super(...arguments);
    this.set('payload', {
      add: [],
      remove: [],
      update: [],
    });
  },

  getUpdate(id) {
    if (id && isNaN(id)) {
      const added = this.get('payload.add').find(c => c.id === id);
      if (added) return added;
    }
    const found = this.get('payload.update').find((c) => c.id === id);
    if (!found) {
      const newObj = { id };
      this.get('payload.update').pushObject(newObj);
      return newObj;
    }
    return found;
  },

  resetUpdate(entry) {
    if (!Object.keys(entry).filter(k => k !== 'id').length) {
      if (entry.id && isNaN(entry.id)) {
        const added = this.get('payload.add').find(c => c.id === entry.id);
        if (added) this.payload.added.removeObject(entry);
      } else {
        const update = this.get('payload.update').find(c => c.id === entry.id);
        if (update) this.payload.update.removeObject(entry);
      }
    }
  },

  actions: {
    showModal() {
      this.set('isModalOpen', true);
    },
    add() {
      const document = {
        id: this.generateId(),
        labels: [],
      };
      this.documents.pushObject(document);
      this.payload.add.pushObject(document);
    },
    remove(document) {
      this.documents.removeObject(document);
      if (document.id && !isNaN(document.id) ) {
        this.payload.remove.pushObject(document.id);
      } else {
        this.payload.add.removeObject(document);
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
        this.resetUpdate(entry);
      }
    },
    transitionToPortal() {
      this.transitionToRoute('portal');
    },
  }
});
