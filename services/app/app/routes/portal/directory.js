import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { queryManager } from 'ember-apollo-client';
import { get } from '@ember/object';
import query from '@base-cms/company-update-app/gql/queries/portal/categories';

const pagination = {
  pagination: { limit: 0 },
  sort: { field: 'name', order: 'asc' },
};

export default Route.extend({
  config: inject(),
  apollo: queryManager(),

  model() {
    const { directoryCategoryIds } = this.config;
    const { hash } = this.paramsFor('portal');
    const variables = {
      categories: {
        includeIds: directoryCategoryIds,
        includeTypes: ['Category'],
        rootOnly: true,
        ...pagination,
      },
      children: pagination,
      content: { hash, status: 'any' },
    };
    return this.apollo.query({ query, variables });
  },

  afterModel(model) {
    const { hash } = this.modelFor('portal');
    this.controllerFor('portal.directory').set('hash', hash);
    const selected = get(model, 'contentHash.taxonomyIds') || [];
    this.controllerFor('portal.directory').set('initial', [...selected]);
    this.controllerFor('portal.directory').set('selected', [...selected]);
  },

});
