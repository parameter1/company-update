import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import { set } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import query from 'cuf/gql/queries/submissions';

export default Route.extend(AuthenticatedRouteMixin, {
  apollo: queryManager(),

  model() {
    return this.apollo.watchQuery({ query, fetchPolicy: 'cache-and-network' }, 'companyUpdateSubmissions');
  },
  actions: {
    loading(transition) {
      const controller = this.controllerFor(this.routeName);
      set(controller, 'isLoading', true);
      transition.promise.finally(() => setTimeout(() => set(controller, 'isLoading', false), 250));
    },
    refresh() {
      this.refresh();
      return false;
    },
  },
});
