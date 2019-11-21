import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { RouteQueryManager } from 'ember-apollo-client';

import query from 'cuf/gql/queries/config';

export default Route.extend(RouteQueryManager, {
  config: inject(),

  model() {
    return this.get('apollo').watchQuery({ query, fetchPolicy: 'cache-and-network' }, 'companyUpdateConfig');
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
