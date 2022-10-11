import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject } from '@ember/service';
import { queryManager } from 'ember-apollo-client';

import query from '@base-cms/company-update-app/gql/queries/config';

export default Route.extend(ApplicationRouteMixin, {
  config: inject(),
  apollo: queryManager(),

  model() {
    return this.apollo.query({ query }, 'companyUpdateConfig');
  },
  afterModel({
    contactUrl,
    contactText,
    companyCustomAttributes,
    directoryEnabled,
    directoryCategoryIds,
    directorySelectionMax,
    logoUrl,
    leadershipEnabled,
    leadershipPromotionsEnabled,
    leadershipCompanyLabel,
    leadershipCategoryPrefix,
    leadershipScheduledSitesOnly,
    leadershipSectionAlias,
    leadershipSectionMax,
    leadershipPrimarySiteOnly,
    locale
  }) {
    this.config.load({
      contactUrl,
      contactText,
      companyCustomAttributes,
      directoryEnabled,
      directoryCategoryIds,
      directorySelectionMax,
      logoUrl,
      leadershipEnabled,
      leadershipPromotionsEnabled,
      leadershipCompanyLabel,
      leadershipCategoryPrefix,
      leadershipScheduledSitesOnly,
      leadershipSectionAlias,
      leadershipSectionMax,
      leadershipPrimarySiteOnly,
      locale
    });
  },
});
