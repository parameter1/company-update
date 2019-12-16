import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import query from '@base-cms/company-update-app/gql/queries/review/leadership';

export default Route.extend({
  apollo: queryManager(),

  async model() {
    const { submission, company } = this.modelFor('review');
    const { payload: { categories } } = submission;
    const pagination = { limit: 0 };
    const variables = { input: { includeIds: categories, pagination } };
    const sections = await this.apollo.query({ query, variables, fetchPolicy: 'network-only' }, 'websiteSections');
    return { submission, company, sections, categories };
  },

});
