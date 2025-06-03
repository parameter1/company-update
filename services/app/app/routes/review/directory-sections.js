import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import query from '@base-cms/company-update-app/gql/queries/review/directory-sections';

export default Route.extend({
  apollo: queryManager(),

  async model() {
    const { submission, company } = this.modelFor('review');
    const { added, removed } = submission.payload;
    const pagination = { limit: 0 };
    const variables = { input: { includeIds: [...added, ...removed], pagination } };
    const websiteSections = await this.apollo.query({ query, variables, fetchPolicy: 'network-only' }, 'websiteSections');
    return { submission, company, sections: websiteSections, selected: added, removed };
  },

});
