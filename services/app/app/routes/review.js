import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { queryManager } from 'ember-apollo-client';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { get, set, computed } from '@ember/object';
import submissionQuery from '@base-cms/company-update-app/gql/queries/review/submission';
import companyQueryBuilder from '@base-cms/company-update-app/gql/queries/review/company';

export default Route.extend(AuthenticatedRouteMixin, {
  config: inject(),
  apollo: queryManager(),
  attrKeys: computed('config.companyCustomAttributes', function() {
    const attrs = this.config.companyCustomAttributes || [];
    return attrs.map((attr) => attr.key);
  }),

  async model() {
    const { id } = this.paramsFor('review');
    const variables = { id };
    const submission = await this.apollo.query({ query: submissionQuery, variables, fetchPolicy: 'network-only' }, 'companyUpdateSubmission');
    if (!submission.parsed) {
      submission.payload = JSON.parse(submission.payload);
      submission.parsed = true;
    }
    const { hash } = submission;
    const companyQuery = companyQueryBuilder(this.attrKeys);
    const company = await this.apollo.query({
      query: companyQuery,
      variables: { input: { hash } },
      fetchPolicy: 'network-only'
    }, 'contentHash');

    set(company, 'logo', get(company, 'primaryImage.src'));
    return { company, submission };
  },
});
