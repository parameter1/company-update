import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import { get, set } from '@ember/object';

export default Route.extend({
  apollo: queryManager(),

  model() {
    return this.modelFor('portal');
  },
  afterModel(model) {
    const schedules = get(model, 'websiteSchedules') || [];
    const sectionIds = schedules.map((s) => get(s, 'section.id'));
    set(model, 'sectionIds', sectionIds);
  },
});
