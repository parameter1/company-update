import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import { get, set } from '@ember/object';

export default Route.extend({
  apollo: queryManager(),

  model() {
    return this.modelFor('portal');
  },
  afterModel(model) {
    const sectionIds = get(model, 'websiteSchedules').map(({ section }) => section.id);
    set(model, 'sectionIds', sectionIds);
  },
});
