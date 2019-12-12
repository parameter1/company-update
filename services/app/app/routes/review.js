import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { get, set } from '@ember/object';
import submissionQuery from 'cuf/gql/queries/review/submission';
import companyQuery from 'cuf/gql/queries/review/company';

export default Route.extend(AuthenticatedRouteMixin, {
  apollo: queryManager(),

  async model() {
    const { id } = this.paramsFor('review');
    const variables = { id };
    const submission = await this.apollo.query({ query: submissionQuery, variables, fetchPolicy: 'network-only' }, 'companyUpdateSubmission');
    if (!submission.parsed) {
      submission.payload = JSON.parse(submission.payload);
      submission.parsed = true;
    }
    const { hash } = submission;
    const company = await this.apollo.query({
      query: companyQuery,
      variables: { input: { hash } },
      fetchPolicy: 'network-only'
    }, 'contentHash');

    set(company, 'logo', get(company, 'primaryImage.src'));
    return { company, submission };
  },
});
