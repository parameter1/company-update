import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { queryManager } from 'ember-apollo-client';
import query from 'cuf/gql/queries/portal/categories';

export default Route.extend({
  config: inject(),
  apollo: queryManager(),

  async model() {
    const { leadershipSectionAlias } = this.config;
    const variables = {
      sites: {
        pagination: { limit: 0 },
        sort: { field: 'name', order: 'asc' },
      },
      leaders: {
        rootOnly: true,
        includeAliases: [leadershipSectionAlias],
        pagination: { limit: 0 },
        sort: { field: 'name', order: 'asc' },
      },
      children: {
        pagination: { limit: 0 },
        sort: { field: 'name', order: 'asc' },
      },
    };
    return this.apollo.query({ query, variables, fetchPolicy: 'network-only' }, 'websiteSites');
  },

  afterModel() {
    const { hash } = this.modelFor('portal');
    this.controllerFor('portal.leadership').set('hash', hash);
  },

});
