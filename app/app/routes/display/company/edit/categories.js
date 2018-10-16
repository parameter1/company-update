import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { RouteQueryManager } from 'ember-apollo-client';

import query from 'cuf/gql/queries/sections';

export default Route.extend(RouteQueryManager, {
  config: inject(),

  model() {
    const ids = this.get('config.ids');
    const variables = { input: { ids } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'cache-and-network' }, 'base4WebsiteSections');
  },
});
