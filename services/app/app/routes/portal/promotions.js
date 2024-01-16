import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import { get } from '@ember/object';
import query from '@base-cms/company-update-app/gql/queries/portal/promotions';

export default Route.extend({
  apollo: queryManager(),

  async model() {
    const { hash } = this.paramsFor('portal');
    const variables = { input: { hash, status: 'any' } };
    const model = await this.apollo.query({ query, variables, fetchPolicy: 'network-only' }, 'contentHash');
    if (!model) throw new Error('Invalid URL');
    return model;
  },

  afterModel(model) {
    const { hash } = this.paramsFor('portal');
    const returnedPromotions = get(model, 'promotions.edges');
    const promotions = Array.isArray(returnedPromotions) ?  returnedPromotions : [];
    const mappedPromotions = promotions.map(({ node }) => {
      const { id, name, linkUrl, linkText, primaryImage } = node;
      return { id, name, linkUrl, linkText, ...(primaryImage && { primaryImage } || { primaryImage: { src: null } }) };
    });
    this.controllerFor('portal.promotions').set('hash', hash);
    this.controllerFor('portal.promotions').set('promotions', mappedPromotions)
    this.controllerFor('portal.promotions').set('payload.add', []);
    this.controllerFor('portal.promotions').set('payload.remove', []);
    this.controllerFor('portal.promotions').set('payload.update', []);
  },
});
