import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import query from 'cuf/gql/queries/portal/contacts';

export default Route.extend({
  apollo: queryManager(),

  async model() {
    const { hash } = this.paramsFor('portal');
    const variables = { input: { hash } };
    const model = await this.apollo.query({ query, variables, fetchPolicy: 'network-only' }, 'contentHash');
    if (!model) throw new Error('Invalid URL');
    return model;
  },

  afterModel() {
    const { hash } = this.paramsFor('portal');
    this.controllerFor('portal.contacts').set('hash', hash);
  },
});
