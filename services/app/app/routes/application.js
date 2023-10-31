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
    contactsEnabled,
    contactUrl,
    contactText,
    companyCustomAttributes,
    directoryEnabled,
    directoryCategoryIds,
    directorySelectionMax,
    directorySectionsEnabled,
    directorySectionsAlias,
    directorySectionsPrimarySiteOnly,
    directorySectionsScheduledSitesOnly,
    logoUrl,
    leadershipEnabled,
    leadershipPromotionsEnabled,
    leadershipCompanyLabel,
    leadershipCategoryPrefix,
    leadershipScheduledSitesOnly,
    leadershipSectionAlias,
    leadershipSectionMax,
    leadershipPrimarySiteOnly,
    leadershipAllowCategoryRemoval,
    portalPageVerbiage,
    companyDetailsVerbiage,
    promotionsVerbiage,
    requiredCompanyFields,
    locale
  }) {
    this.config.load({
      contactsEnabled,
      contactUrl,
      contactText,
      companyCustomAttributes,
      directoryEnabled,
      directoryCategoryIds,
      directorySelectionMax,
      directorySectionsEnabled,
      directorySectionsAlias,
      directorySectionsPrimarySiteOnly,
      directorySectionsScheduledSitesOnly,
      logoUrl,
      leadershipEnabled,
      leadershipPromotionsEnabled,
      leadershipCompanyLabel,
      leadershipCategoryPrefix,
      leadershipScheduledSitesOnly,
      leadershipSectionAlias,
      leadershipSectionMax,
      leadershipPrimarySiteOnly,
      leadershipAllowCategoryRemoval,
      portalPageVerbiage,
      companyDetailsVerbiage,
      promotionsVerbiage,
      requiredCompanyFields,
      locale
    });
  },
});
