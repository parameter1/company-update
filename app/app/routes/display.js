import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';

import query from 'cuf/gql/queries/config';

export default Route.extend(RouteQueryManager, {
  model() {
    return this.get('apollo').watchQuery({ query, fetchPolicy: 'cache-and-network' });
  },
  setupController(controller, model) {
    this._super(controller, model);
    const { config } = model;
    controller.set('config', config);
  },
});
