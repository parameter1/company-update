import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  // Merges contacts into a single array
  contacts: computed('model.{salesContacts,listingContacts,publicContacts}.[]', function() {
    const contacts = [];
    ['publicContacts', 'listingContacts', 'salesContacts'].forEach((type) => {
      const check = this.get(`model.${type}`);
      if (check && Object.prototype.hasOwnProperty.call(check, 'edges')) {
        check.edges.forEach(({ node }) => contacts.push({ type, ...node }));
      }
    })
    return contacts;
  }),

  isModalOpen: false,

  logo: computed.reads('model.primaryImage.src'),

  title: computed('model', function() {
    return `${this.get('model.name')}`;
  }),

  actions: {
    showModal() {
      this.set('model.logo', this.get('model.primaryImage.src'));
      this.set('isModalOpen', true);
    },
    transitionToThankYou() {
      this.transitionToRoute('portal.thanks');
    },
  }
});
