import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
// import { copy } from '@ember/object/internals';
import query from '@base-cms/company-update-app/gql/queries/portal/company';

export default Route.extend({
  apollo: queryManager(),

  async model() {
    const { hash } = this.paramsFor('portal');
    const variables = { input: { hash } };
    const model = await this.apollo.query({ query, variables, fetchPolicy: 'network-only' }, 'contentHash');
    if (!model) throw new Error('Invalid URL');
    // @todo; this doesn't deep clone arrays correctly (social links)
    // return copy(model);
    if (!model.youtube) model.youtube = {};
    return model;
  },
});
