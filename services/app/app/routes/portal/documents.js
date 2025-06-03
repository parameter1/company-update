import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import { get } from '@ember/object';
import query from '@base-cms/company-update-app/gql/queries/portal/documents';

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
    const returnedDocuments = get(model, 'documents.edges');
    const documents = Array.isArray(returnedDocuments) ?  returnedDocuments : [];
    const mappedDocuments = documents.map(({ node }) => {
      const {
        id,
        name,
        teaser,
        fileSrc,
        labels
      } = node;
      return {
        id,
        name,
        teaser,
        ...(fileSrc && { fileSrc } || { fileSrc: null }),
        ...((Array.isArray(labels) && labels.length) && { labels } || { labels: [] })
      };
    });
    this.controllerFor('portal.documents').set('hash', hash);
    this.controllerFor('portal.documents').set('documents', mappedDocuments)
    this.controllerFor('portal.documents').set('payload.add', []);
    this.controllerFor('portal.documents').set('payload.remove', []);
    this.controllerFor('portal.documents').set('payload.update', []);
  },
});
