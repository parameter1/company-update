import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { queryManager } from 'ember-apollo-client';
import companyQuery from '@base-cms/company-update-app/gql/queries/review/promotion-company';

export default Route.extend({
  apollo: queryManager(),

  async model() {
    const { submission, company: { hash } } = this.modelFor('review');
    const company = await this.apollo.query({ query: companyQuery, variables: { input: { hash, status: 'any' } } }, 'contentHash');
    const { payload: { add, remove, update } } = submission;

    const original = get(company, 'promotions.edges').map(({ node }) => {
      const { id, linkText, linkUrl, name, primaryImage } = node;
      return { id, linkText, linkUrl, name, primaryImage };
    });

    const promotions = original.reduce((arr, promotion) => {
      const { id } = promotion;
      const updated = update.find((u) => u.id === id);
      if (updated) {
        return [
          ...arr,
          {
            original: promotion,
            updated: { ...promotion, ...updated },
            payload: {
              enabled: true,
              updated: true,
              fields: Object.keys(updated).reduce((obj, k) => {
                if (k === 'id') return obj;
                return { ...obj, [k]: true };
              }, {})
            },
          },
        ];
      }
      if (remove.includes(id)) {
        return [
          ...arr,
          {
            original: promotion,
            payload: { enabled: true, removed: true },
          },
        ];
      }
      return [ ...arr, { original: promotion, updated: promotion, payload: { enabled: false } } ];
    }, []);
    add.forEach((promotion) => promotions.push({
      updated: promotion,
      payload: {
        enabled: true,
        added: true,
        fields: Object.keys(promotion).reduce((obj, k) => {
          if (k === 'id') return obj;
          return { ...obj, [k]: true };
        }, {})
      },
    }));
    return { submission, company, promotions };
  },

});
