import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { queryManager } from 'ember-apollo-client';
import { hash } from 'rsvp'

import query from 'cuf/gql/queries/sections';

export default Route.extend({
  apollo: queryManager(),
  config: inject(),

  model() {
    const ids = this.config.ids;
    const variables = { input: { includeIds: ids } };
    const company = this.modelFor('display.company');
    const sections = this.apollo.watchQuery({ query, variables, fetchPolicy: 'cache-and-network' }, 'websiteSections');
    return hash({ company, sections });
  },
});
