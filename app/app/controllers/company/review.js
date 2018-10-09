import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  // Merges contacts into a single array
  contacts: computed('model.submission.contacts.[]', function() {
    const contacts = [];
    ['publicContacts', 'listingContacts', 'salesContacts'].forEach((type) => {
      const check = this.get(`model.${type}`);
      if (check && Object.prototype.hasOwnProperty.call(check, 'edges')) {
        check.edges.forEach(({ node }) => contacts.push({ type, ...node }));
      }
    })
    return contacts;
  }),

  // Determines display order, labels, and visibility/type of updateable fields
  fields: [ // eslint-disable-line ember/avoid-leaking-state-in-ember-objects
    {
      label: 'Name',
      key: 'name',
    },
    {
      label: 'Address 1',
      key: 'address1',
    },
    {
      label: 'Address 2',
      key: 'address2',
    },
    {
      label: 'City',
      key: 'city',
    },
    {
      label: 'State',
      key: 'state',
    },
    {
      label: 'Zip/Postal Code',
      key: 'zip',
    },
    {
      label: 'Country',
      key: 'country',
    },
    {
      label: 'Phone Number',
      key: 'phone',
    },
    {
      label: 'Phone (Toll-free)',
      key: 'tollfree',
    },
    {
      label: 'Fax Number',
      key: 'fax',
    },
    {
      label: 'Website',
      key: 'website',
    },
    {
      label: 'Type',
      key: 'type',
    },
    {
      label: 'Email Address',
      key: 'email',
    },
    {
      label: 'Description',
      key: 'body',
      type: 'long',
    },
  ],
});

