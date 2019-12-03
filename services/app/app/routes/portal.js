import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import query from 'cuf/gql/queries/company';

export default Route.extend({
  apollo: queryManager(),

  model({ hash }) {
    const variables = { input: { hash } };
    return this.apollo.query({ query, variables }, 'contentHash');
  },
});
