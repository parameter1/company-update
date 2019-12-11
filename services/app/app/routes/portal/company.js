import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import { copy } from '@ember/object/internals';

export default Route.extend({
  apollo: queryManager(),

  async model() {
    const company = this.modelFor('portal');
    // @todo; this doesn't deep clone arrays correctly (social links)
    return copy(company);
  },
});
