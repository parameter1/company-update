import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { queryManager } from 'ember-apollo-client';
import query from '@base-cms/company-update-app/gql/queries/review/categories';

const pagination = {
  pagination: { limit: 0 },
  sort: { field: 'name', order: 'asc' },
};

export default Route.extend({
  config: inject(),
  apollo: queryManager(),

  async model() {
    const { directoryCategoryIds } = this.config;
    const { submission, company } = this.modelFor('review');
    const { added, removed } = submission.payload;
    const variables = {
      categories: {
        includeIds: directoryCategoryIds,
        includeTypes: ['Category'],
        rootOnly: true,
        ...pagination,
      },
      children: pagination,
    };
    const categories = await this.apollo.query({ query, variables }, 'categories');

    return {
      submission,
      company,
      categories,
      added,
      removed,
    }
  },
  afterModel({ company, added, removed }) {
    this.controllerFor('review.directory').set('selectedIds', [...added, ...removed]);
    this.controllerFor('review.directory').set('addedIds', [...added]);
    this.controllerFor('review.directory').set('removedIds', [...removed]);
    this.controllerFor('review.directory').set('contentIds', [...company.taxonomyIds]);
  }
});
