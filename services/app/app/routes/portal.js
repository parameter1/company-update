import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import query from 'cuf/gql/queries/portal';

export default Route.extend({
  apollo: queryManager(),

  async model({ hash }) {
    const variables = { input: { hash } };
    const model = await this.apollo.query({ query, variables, fetchPolicy: 'network-only' }, 'contentHash');
    if (!model) throw new Error('Invalid URL');
    return model;
  },

  renderTemplate() {
    this._super(...arguments);
    this.render('portal.nav', { into: 'application', outlet: 'nav' });
  }
});
