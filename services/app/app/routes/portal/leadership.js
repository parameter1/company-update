import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { queryManager } from 'ember-apollo-client';
import { get } from '@ember/object';
import multi from '@base-cms/company-update-app/gql/queries/portal/categories';
import single from '@base-cms/company-update-app/gql/queries/portal/leadership-single';

export default Route.extend({
  config: inject(),
  apollo: queryManager(),

  async model() {
    const { leadershipSectionAlias, leadershipPrimarySiteOnly } = this.config;
    if (leadershipPrimarySiteOnly) {
      const siteId = get(this.modelFor('portal'), 'primarySite.id');
      const variables = {
        site: {
          id: siteId,
        },
        leaders: {
          siteId,
          includeAliases: [leadershipSectionAlias],
          pagination: { limit: 0 },
          sort: { field: 'name', order: 'asc' },
        },
        children: {
          pagination: { limit: 0 },
          sort: { field: 'name', order: 'asc' },
        }
      };
      const { websiteSite, websiteSections } = await this.apollo.query({
        query: single,
        variables,
        fetchPolicy: 'network-only',
      });

      return { ...websiteSite, sections: websiteSections };
    }
    const variables = {
      sites: {
        pagination: { limit: 0 },
        sort: { field: 'name', order: 'asc' },
      },
      leaders: {
        includeAliases: [leadershipSectionAlias],
        pagination: { limit: 0 },
        sort: { field: 'name', order: 'asc' },
      },
      children: {
        pagination: { limit: 0 },
        sort: { field: 'name', order: 'asc' },
      },
    };
    return this.apollo.query({ query: multi, variables, fetchPolicy: 'network-only' }, 'websiteSites');
  },

  afterModel() {
    const { hash } = this.modelFor('portal');
    this.controllerFor('portal.leadership').set('hash', hash);
  },

});
