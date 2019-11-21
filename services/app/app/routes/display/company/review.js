import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import { hash } from 'rsvp'
import query from 'cuf/gql/queries/review';

export default Route.extend(RouteQueryManager, {
  model({ id }) {
    const company = this.modelFor('display.company');
    const variables = { id };
    const submission = this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'cache-and-network' }, 'companyUpdateSubmission');
    return hash({ company, submission });
  },

  afterModel(model) {
    model.submission.payload = JSON.parse(model.submission.payload);
  },

});
