import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import { copy } from '@ember/object/internals';

export default Route.extend({
  apollo: queryManager(),

  async model() {
    const company = this.modelFor('portal');
    return copy(company);
  },
});
