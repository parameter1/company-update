import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import query from 'cuf/gql/queries/review';
import companyQuery from 'cuf/gql/queries/company';

export default Route.extend(AuthenticatedRouteMixin, {
  apollo: queryManager(),

  async model({ id }) {
    const variables = { id };
    const submission = await this.apollo.query({ query, variables }, 'companyUpdateSubmission');
    if (!submission.parsed) {
      submission.payload = JSON.parse(submission.payload);
      submission.parsed = true;
    }
    const { hash } = submission;
    const company = await this.apollo.query({ query: companyQuery, variables: { input: { hash } } }, 'contentHash');
    return { company, submission };
  },
});
