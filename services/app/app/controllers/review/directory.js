import Controller from '@ember/controller';
import { computed, get, set } from '@ember/object';
import { inject } from '@ember/service';

import getGraphQlError from '@base-cms/company-update-app/utils/get-graphql-error';
import ActionMixin from '@base-cms/company-update-app/mixins/action';
import discard from '@base-cms/company-update-app/gql/mutations/discard';
// import publish from '@base-cms/company-update-app/gql/mutations/review/leadership';

export default Controller.extend(ActionMixin, {
  apollo: inject(),
  notify: inject(),
  config: inject(),
  disabled: computed.reads('isActionRunning'),

  init() {
    this._super(...arguments);
    this.set('selectedIds', []);
    this.set('addedIds', []);
    this.set('removedIds', []);
    this.set('contentIds', []);
  },

  isPublishDisabled: computed('isDisabled', 'selectedIds.length', function() {
    if (!this.get('selectedIds.length')) return true;
    return this.get('isDisabled');
  }),

  isDisabled: computed('isActionRunning', 'model.submission.reviewed', function() {
    if (this.get('model.submission.reviewed')) return true;
    return this.get('isActionRunning');
  }),

  categories: computed('model.categories', function() {
    return this.get('model.categories.edges').map(({ node }) => node);
  }),

  payload: computed('addedIds', 'removedIds', 'selectedIds', 'selectedIds.[]', function() {
    const { addedIds, removedIds } = this.getProperties('addedIds', 'removedIds');
    const selectedIds = this.get('selectedIds');
    console.log('compute payload', addedIds, removedIds, selectedIds);
    return {
      added: addedIds.filter((id) => selectedIds.includes(id)),
      removed: removedIds.filter((id) => selectedIds.includes(id)),
    };
  }),

  actions: {
    toggleSection(id) {
      const selectedIds = this.get('selectedIds') || [];
      if (selectedIds.includes(id)) {
        selectedIds.removeObject(id);
      } else {
        selectedIds.pushObject(id);
      }
    },
    async publish() {
      this.startAction();
      try {
        // const { id } = this.get('model.submission');
        const contentId = this.get('model.company.id');
        const { added, removed } = this.get('payload');
        // const variables = { input: { contentId } };
        // One update to add, one to remove
        console.log('publish', { contentId, added, removed });
        throw new Error('NYI');
        // await this.apollo.mutate({ mutation: publish, variables }, 'quickCreateWebsiteSchedules');
        // set(this, 'model.submission.reviewed', true);
        // await this.apollo.mutate({ mutation: discard, variables: { id }, refetchQueries: ['ContentUpdateListSubmissions'] });
        // this.notify.success('Changes have been published!');
        // this.transitionToRoute('list');
      } catch (e) {
        this.notify.error(getGraphQlError(e), { autoClear: false });
      } finally {
        this.endAction();
      }
    },
    async discard() {
      this.startAction()
      try {
        await this.apollo.mutate({ mutation: discard, variables: { id: get(this, 'model.submission.id') } });
        this.notify.warning('Changes have been discarded!');
        this.transitionToRoute('list');
        set(this, 'model.submission.reviewed', true);
      } catch (e) {
        this.notify.error(getGraphQlError(e), { autoClear: false });
      } finally {
        this.endAction();
      }
    },
  },
});
