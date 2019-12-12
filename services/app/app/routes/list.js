import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import { set } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ActionMixin from '../mixins/action';

import submissions from 'cuf/gql/queries/list';
import companyQuery from 'cuf/gql/queries/list/company';

export default Route.extend(AuthenticatedRouteMixin, ActionMixin, {
  apollo: queryManager(),

  queryParams: {
    all: {
      refreshModel: true
    },
  },

  async model({ all }) {
    this.startAction();
    const model = await this.apollo.watchQuery({ query: submissions, variables: { input: { all } }, fetchPolicy: 'cache-and-network' }, 'companyUpdateSubmissions');
    const merged = await Promise.all(model.map(async ({ hash, ...rest }) => {
      const variables = { input: { hash } };
      const company = await this.apollo.query({ query: companyQuery, variables }, 'contentHash');
      return { hash, ...rest, company };
    }));
    this.endAction();
    return merged;
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
