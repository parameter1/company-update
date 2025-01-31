import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { queryManager } from 'ember-apollo-client';
import companyQuery from '@base-cms/company-update-app/gql/queries/review/document-company';

export default Route.extend({
  apollo: queryManager(),

  async model() {
    const { submission, company: { hash } } = this.modelFor('review');
    const company = await this.apollo.query({ query: companyQuery, variables: { input: { hash, status: 'any' } } }, 'contentHash');
    return { submission, company };
  },

  afterModel(model) {
    const original = get(model, 'company.documents.edges').map(({ node }) => {
      const { id, name, teaser, labels, fileSrc } = node;
      return { id, name, teaser, labels, fileSrc  };
    });

    const documents = original.reduce((arr, document) => {
      const { id } = document;
      const updated = get(model, 'submission.payload.update').find((u) => u.id === id);
      if (updated) {
        return [
          ...arr,
          {
            original: document,
            updated: { ...document, ...updated },
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
      if (get(model, 'submission.payload.remove').includes(id)) {
        return [
          ...arr,
          {
            original: document,
            payload: { enabled: true, removed: true },
          },
        ];
      }
      return [ ...arr, { original: document, updated: document, payload: { enabled: false } } ];
    }, []);
    get(model, 'submission.payload.add').forEach((document) => documents.push({
      updated: document,
      payload: {
        enabled: true,
        added: true,
        fields: Object.keys(document).reduce((obj, k) => {
          if (k === 'id') return obj;
          return { ...obj, [k]: true };
        }, {})
      },
    }));
    this.controllerFor('review.document').set('documents', documents)
  }

});
