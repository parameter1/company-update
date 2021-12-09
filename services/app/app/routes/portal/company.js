import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { queryManager } from 'ember-apollo-client';
import { set, computed } from '@ember/object';
import queryBuilder from '@base-cms/company-update-app/gql/queries/portal/company';

export default Route.extend({
  config: inject(),
  apollo: queryManager(),
  attrKeys: computed('config.companyCustomAttributes', function() {
    const attrs = this.config.companyCustomAttributes || [];
    return attrs.map((attr) => attr.key);
  }),

  async model() {
    const { hash } = this.paramsFor('portal');
    const variables = { input: { hash } };
    const query = queryBuilder(this.attrKeys);
    const model = await this.apollo.query({ query, variables, fetchPolicy: 'network-only' }, 'contentHash');
    if (!model) throw new Error('Invalid URL');
    // @todo; this doesn't deep clone arrays correctly (social links)
    // return copy(model);
    if (!model.youtube) model.youtube = {};
    if (!model.externalLinks) model.externalLinks = [];
    if (!model.externalLinks.some(link => link.key === 'company-products')) {
      model.externalLinks.pushObject({ key: 'company-products' });
    }
    set(model, 'productsUrl', model.externalLinks
      .filter(link => link.key === 'company-products')
      .firstObject);
    return model;
  },
});
