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

  // Determines display order, labels, and visibility/type of updateable fields
  fields: [ // eslint-disable-line ember/avoid-leaking-state-in-ember-objects
    [
      {
        label: 'Name',
        key: 'name',
      }
    ],
    [
      {
        label: 'Address 1',
        key: 'address1',
        class: 'col-md-4',
      },
      {
        label: 'Address 2',
        key: 'address2',
        class: 'col-md-4',
      },
      {
        label: 'City',
        key: 'city',
        class: 'col-md-4',
      },
    ],
    [
      {
        label: 'State',
        key: 'state',
        class: 'col-md-4',
      },
      {
        label: 'Zip/Postal Code',
        key: 'zip',
        class: 'col-md-4',
      },
      {
        label: 'Country',
        key: 'country',
        class: 'col-md-4',
      },
    ],
    [
      {
        label: 'Phone Number',
        key: 'phone',
        class: 'col-md-4',
      },
      {
        label: 'Phone (Toll-free)',
        key: 'tollfree',
        class: 'col-md-4',
      },
      {
        label: 'Fax Number',
        key: 'fax',
        class: 'col-md-4',
      },
    ],
    [
      {
        label: 'Website',
        key: 'website',
        class: 'col-md-6',
      },
      {
        label: 'Email Address',
        key: 'email',
        class: 'col-md-6',
      },
    ],
    [
      {
        label: 'Description',
        key: 'body',
        type: 'long',
      },
    ],
  ],
});

