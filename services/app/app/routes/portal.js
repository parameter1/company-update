import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import { inject } from '@ember/service';
import query from '@base-cms/company-update-app/gql/queries/portal';

export default Route.extend({
  config: inject(),
  apollo: queryManager(),

  async model({ hash }) {
    const variables = { input: { hash } };
    const model = await this.apollo.query({ query, variables, fetchPolicy: 'network-only' }, 'contentHash');
    if (!model) throw new Error('Invalid URL');
    
    // Check that leadershipEnable is true && if a leadershipCompay Label is set.  
    // If so check if the label is in the list of company labels.
    // If not set the LeadershipEnable to false.
    if (this.config.leadershipEnabled && this.config.leadershipCompanyLabel) {
      if(!model.labels.includes(this.config.leadershipCompanyLabel)) this.config.leadershipEnabled = false;
    }

    return model;
  },

  renderTemplate() {
    this._super(...arguments);
    this.render('portal.nav', { into: 'application', outlet: 'nav' });
  }
});
