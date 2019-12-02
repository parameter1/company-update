import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import { hash } from 'rsvp'
import query from 'cuf/gql/queries/review';

export default Route.extend({
  apollo: queryManager(),

  model({ id }) {
    const company = this.modelFor('display.company');
    const variables = { id };
    const submission = this.apollo.watchQuery({ query, variables, fetchPolicy: 'cache-and-network' }, 'companyUpdateSubmission');
    return hash({ company, submission });
  },

  afterModel(model) {
    model.submission.payload = JSON.parse(model.submission.payload);
  },

});
