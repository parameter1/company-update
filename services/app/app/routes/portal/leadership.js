import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { queryManager } from 'ember-apollo-client';
import { get } from '@ember/object';
import single from '@base-cms/company-update-app/gql/queries/portal/leadership-single';
import multi from '@base-cms/company-update-app/gql/queries/portal/leadership-multi';

const pagination = {
  pagination: { limit: 0 },
  sort: { field: 'name', order: 'asc' },
};

export default Route.extend({
  config: inject(),
  apollo: queryManager(),

  async model() {
    const {
      leadershipSectionAlias,
      leadershipPrimarySiteOnly,
      leadershipScheduledSitesOnly,
    } = this.config;
    const siteId = get(this.modelFor('portal'), 'primarySite.id');
    const { hash } = this.paramsFor('portal');

    if (leadershipPrimarySiteOnly) {
      const variables = {
        site: { id: siteId },
        leaders: { includeAliases: [leadershipSectionAlias], ...pagination, siteId },
        children: pagination,
        content: { hash, status: 'any' },
        leadersAlias: leadershipSectionAlias
      };
      const {
        contentHash,
        websiteSite,
        websiteSections,
      } = await this.apollo.query({ query: single, variables, fetchPolicy: 'network-only' });
      return {
        contentHash,
        websiteSites: {
          edges: [{ node: { ...websiteSite, sections: websiteSections } }],
          totalCount: 1,
        },
      };
    }

    const variables = {
      sites: pagination,
      leaders: { includeAliases: [leadershipSectionAlias], ...pagination },
      children: pagination,
      content: { hash, status: 'any' },
      leadersAlias: leadershipSectionAlias
    };
    const {
      contentHash,
      websiteSites,
      websiteSections,
    } = await this.apollo.query({ query: multi, variables, fetchPolicy: 'network-only' });

    // If enabled, limit sites to those the content has been scheduled to.
    const siteIds = [...(new Set(leadershipScheduledSitesOnly && contentHash.websiteSchedules.length
      ? contentHash.websiteSchedules.map((s => get(s, 'section.site.id')))
      : websiteSites.edges.map(({ node }) => node.id)))];

    return {
      contentHash,
      websiteSites: {
        ...websiteSites,
        edges: [
          ...websiteSites.edges.filter(({ node }) => siteIds.includes(node.id)).map(({ node }) => ({
            node: {
              ...node,
              sections: {
                edges: websiteSections.edges.filter((edge) => get(edge, 'node.site.id') === node.id),
              },
            },
          })),
        ],
      },
    };
  },

  afterModel(model) {
    const { hash } = this.modelFor('portal');
    this.controllerFor('portal.leadership').set('hash', hash);
    const schedules = get(model, 'contentHash.websiteSchedules') || [];
    const ids = schedules.map((s) => get(s, 'section.id'));
    this.controllerFor('portal.leadership').set('categories', ids);
  },

});
