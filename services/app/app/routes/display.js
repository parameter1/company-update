import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { queryManager } from 'ember-apollo-client';

import query from 'cuf/gql/queries/config';

export default Route.extend({
  config: inject(),
  apollo: queryManager(),

  model() {
    return this.apollo.watchQuery({ query, fetchPolicy: 'cache-and-network' }, 'companyUpdateConfig');
  },
  afterModel({
    domain,
    logo,
    ids,
    isPmmi,
  }) {
    this.config.load({
      domain,
      logo,
      ids,
      isPmmi,
    });
  },
});
