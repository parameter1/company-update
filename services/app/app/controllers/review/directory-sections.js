import Controller from '@ember/controller';
import { computed, get, set } from '@ember/object';
import { inject } from '@ember/service';

import getGraphQlError from '@base-cms/company-update-app/utils/get-graphql-error';
import ActionMixin from '@base-cms/company-update-app/mixins/action';
import discard from '@base-cms/company-update-app/gql/mutations/discard';
import publish from '@base-cms/company-update-app/gql/mutations/review/directory-sections';
import companySchedules from '@base-cms/company-update-app/gql/queries/company-schedules';
import deleteWebsiteSchedule from '@base-cms/company-update-app/gql/mutations/delete-website-schedule';

export default Controller.extend(ActionMixin, {
  apollo: inject(),
  notify: inject(),
  config: inject(),
  disabled: computed.reads('isActionRunning'),
  isPublishing: false,
  isDiscarding: false,

  isPublishDisabled: computed('isDisabled', 'isConflicting', 'selected.length', function() {
    if (this.get('isConflicting')) return true;
    if (!this.get('selected.length')) return true;
    return this.get('isDisabled');
  }),

  isDisabled: computed('isActionRunning', 'model.submission.reviewed', function() {
    if (this.get('model.submission.reviewed')) return true;
    return this.get('isActionRunning');
  }),

  isConflicting: computed('sectionIds.[]', 'selected.[]', function() {
    const selected = this.get('selected');
    const sectionIds = this.get('sectionIds');
    return sectionIds.some(id => selected.includes(id));
  }),

  sectionIds: computed('model.company.{published,websiteSchedules.[]}', 'config.directorySectionsAlias', function() {
    const schedules = this.get('model.company.websiteSchedules') || [];
    const directorySectionAlias = this.get('config.directorySectionsAlias');
    // Ensure existing schedules are only considered if they're part of directories
    return Array.from(new Set(schedules.filter((schedule) => schedule.section.alias.match(new RegExp(`^${directorySectionAlias}`))).map(({ section: { id } }) => id)));
  }),

  sites: computed('model.sections.[]', 'config.directorySectionsAlias', function() {
    const sites = this.get('model.sections');
    const directorySectionAlias = this.get('config.directorySectionsAlias');
    const sections = (get(sites, 'edges') || []).map(({ node }) => node);
    const reduced = sections.reduce((obj, section) => {
      const { id, name } = section.site;
      const site = obj[id] || { id, name, sections: [] };
      const { sections } = site;
      const finalizedSections = [...sections];
      // Ensure we're only displaying directory related sections
      if (section.alias.match(new RegExp(`^${directorySectionAlias}`))) finalizedSections.push(section);
      return { ...obj, [id]: { ...site, sections: finalizedSections } };
    }, {});
    return Object.keys(reduced).map(id => reduced[id]).sort((a, b) => a.name.localeCompare(b.name));
  }),

  selected: computed('model.selected', 'sites', function() {
    const sectionIds = this.get('model.selected');
    const sites = this.get('sites');
    // Ensure selected sections are narrowed to the ones actually related to directories
    const applicableSectionIds = new Set(sites.map((site) => site.sections.map((section) => section.id)).flat());
    return sectionIds.filter((sectionId) => applicableSectionIds.has(sectionId));
  }),

  removed: computed.reads('model.removed'),

  actions: {
    toggleSection(id) {
      const selected = this.get('selected') || [];
      const removed = this.get('removed') || [];
      if (selected.includes(id)) {
        selected.removeObject(id);
      } else if (!removed.includes(id)) {
        selected.pushObject(id);
      }
    },
    async publish() {
      this.startAction();
      set(this, 'isPublishing', true);
      try {
        const { id } = this.get('model.submission');
        const contentId = this.get('model.company.id');
        const sectionIds = this.get('selected');
        const variables = { input: { contentId, sectionIds } };
        const existingSchedules = await this.apollo.query({ query: companySchedules, variables: { input: { contentId } } });
        if (existingSchedules && existingSchedules.contentWebsiteSchedules) {
          const nodes = existingSchedules.contentWebsiteSchedules.edges.map((edge) => edge.node);
          const removedIds = this.get('removed');
          const removedIdsSet = new Set(removedIds);
          const scheduleIdsToDelete = nodes.filter((node) => removedIdsSet.has(node.section.id)).map((node) => node.id);
          await Promise.all(scheduleIdsToDelete.map(
            (id) => this.apollo.mutate({ mutation: deleteWebsiteSchedule, variables: { input: { id } } }),
          ));
        }
        await this.apollo.mutate({ mutation: publish, variables }, 'quickCreateWebsiteSchedules');
        set(this, 'model.submission.reviewed', true);
        await this.apollo.mutate({ mutation: discard, variables: { id }, refetchQueries: ['ContentUpdateListSubmissions'] });
        this.notify.success('Changes have been published!');
        this.transitionToRoute('list');
      } catch (e) {
        this.notify.error(getGraphQlError(e), { autoClear: false });
      } finally {
        set(this, 'isPublishing', false);
        this.endAction();
      }
    },
    async discard() {
      this.startAction()
      set(this, 'isDiscarding', true);
      try {
        await this.apollo.mutate({ mutation: discard, variables: { id: get(this, 'model.submission.id') } });
        this.notify.warning('Changes have been discarded!');
        this.transitionToRoute('list');
        set(this, 'model.submission.reviewed', true);
      } catch (e) {
        this.notify.error(getGraphQlError(e), { autoClear: false });
      } finally {
        set(this, 'isDiscarding', false);
        this.endAction();
      }
    },
  },
});
