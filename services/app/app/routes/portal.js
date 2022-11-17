import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import { inject } from '@ember/service';
import query from '@base-cms/company-update-app/gql/queries/portal';

export default Route.extend({
  config: inject(),
  apollo: queryManager(),

  async model({ hash }) {
    const variables = { input: { hash, status: 'any' }, leadersAlias: this.config.leadershipSectionAlias };
    const model = await this.apollo.query({ query, variables, fetchPolicy: 'network-only' }, 'contentHash');
    if (!model) throw new Error('Invalid URL');
    return model;
  },

  renderTemplate() {
    this._super(...arguments);
    this.render('portal.nav', { into: 'application', outlet: 'nav' });
  }
});
