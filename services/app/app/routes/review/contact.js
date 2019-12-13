import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { queryManager } from 'ember-apollo-client';
import companyQuery from '../../gql/queries/review/contact-company';

export default Route.extend({
  apollo: queryManager(),

  async model() {
    const { submission, company: { hash } } = this.modelFor('review');
    const company = await this.apollo.query({ query: companyQuery, variables: { input: { hash } } }, 'contentHash');
    const { payload: { contacts: updated } } = submission;

    const original = get(company, 'publicContacts.edges').map(({ node }) => {
      const { id, firstName, lastName, title, primaryImage } = node;
      return { id, firstName, lastName, title, primaryImage };
    });

    const payload = {
      enabled: true,
      fields: {
        firstName: true,
        lastName: true,
        primaryImage: true,
        title: true,
      },
    };

    const contacts = original.reduce((arr, contact) => {
      const { id } = contact;
      const found = updated.find(({ id: uid }) => uid === id);
      if (found) {
        updated.removeObject(found);
        return [ ...arr, { original: contact, updated: found, payload: { ...payload } }];
      }
      return [ ...arr, { original: contact, payload: { ...payload, removed: true } } ];
    }, []);
    updated.forEach((contact) => contacts.push({ updated: contact, payload: { ...payload, added: true } }));
    return { submission, company, contacts };
  },


});
