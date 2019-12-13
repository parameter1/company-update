import Controller from '@ember/controller';

export default Controller.extend({
  isModalOpen: false,

  actions: {
    showModal() {
      this.set('isModalOpen', true);
    },
    add() {
      this.model.pushObject({});
    },
    remove(contact) {
      this.model.removeObject(contact);
    },
    transitionToPortal() {
      this.transitionToRoute('portal');
    },
  }
});
