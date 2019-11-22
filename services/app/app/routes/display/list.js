import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';

import query from 'cuf/gql/queries/submissions';

export default Route.extend(RouteQueryManager, {
  model() {
    return this.get('apollo').watchQuery({ query, fetchPolicy: 'cache-and-network' }, 'companyUpdateSubmissions');
  },
  actions: {
    loading(transition) {
      const controller = this.controllerFor(this.get('routeName'));
      controller.set('isLoading', true);
      transition.promise.finally(() => setTimeout(() => controller.set('isLoading', false), 250));
    },
    refresh() {
      this.refresh();
      return false;
    },
  },
});
