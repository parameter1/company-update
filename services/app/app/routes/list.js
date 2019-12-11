import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import { set } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ActionMixin from '../mixins/action';

import query from 'cuf/gql/queries/submissions';

export default Route.extend(AuthenticatedRouteMixin, ActionMixin, {
  apollo: queryManager(),

  queryParams: {
    all: {
      refreshModel: true
    },
  },

  async model({ all }) {
    this.startAction();
    const model = await this.apollo.watchQuery({ query, variables: { input: { all } }, fetchPolicy: 'cache-and-network' }, 'companyUpdateSubmissions');
    this.endAction();
    return model;
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
