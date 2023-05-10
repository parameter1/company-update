import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import { set } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ActionMixin from '@base-cms/company-update-app/mixins/action';
import submissions from '@base-cms/company-update-app/gql/queries/list';

export default Route.extend(AuthenticatedRouteMixin, ActionMixin, {
  apollo: queryManager(),

  queryParams: {
    all: {
      refreshModel: true
    },
  },

  async model({ all }) {
    this.startAction();
    const model = await this.apollo.watchQuery({
      query: submissions,
      variables: { input: { all } },
      fetchPolicy: 'network-only',
    }, 'companyUpdateSubmissions');
    this.endAction();
    return model.map((item) => {
      const { label, type, ...rest } = item;
      const finalLabel = label.match('_') ? label.split('_').map((word) => {
        const [firstLetter] = word;
        return word.replace(firstLetter, firstLetter.toUpperCase());
      }).join(' ') : label;
      return {
        ...rest,
        type: type.replace(/_/g, '-'),
        label: finalLabel,
      };
    });
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
