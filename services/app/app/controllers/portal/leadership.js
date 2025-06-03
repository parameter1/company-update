import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  config: inject(),

  isModalOpen: false,
  hash: null,

  submitDisabled: computed('payload.{added,removed}', function() {
    const { added, removed } = this.get('payload');
    return added.length === 0 && removed.length === 0;
  }),

  payload: computed('selected.[]', 'initial.[]', 'config.leadershipAllowCategoryRemoval', function() {
    const sectionRemovalAllowed = this.get('config.leadershipAllowCategoryRemoval');
    const { selected, initial } = this.getProperties('selected', 'initial');
    const payload = { removed: [], added: [] };
    selected.forEach((id) => {
      if (!initial.includes(id)) payload.added.push(id);
    });
    if (sectionRemovalAllowed) {
      initial.forEach((id) => {
        if (!selected.includes(id)) payload.removed.push(id);
      });
    }
    return payload;
  }),

  leadershipEnabled: computed('config.{leadershipEnabled}', 'model.contentHash.{websiteSchedules.[]}', function() {
    const hasSchedules = this.model.contentHash.websiteSchedules && this.model.contentHash.websiteSchedules.length;
    const schedules = hasSchedules ? this.model.contentHash.websiteSchedules
      .filter((schedule) => schedule.section.alias === this.config.leadershipSectionAlias) : [];
    console.log(schedules);
    return this.config.leadershipEnabled || schedules.length;
  }),

  categoryPrefix: computed.reads('config.leadershipCategoryPrefix'),

  init() {
    this._super(...arguments);
    this.set('selected', []);
    this.set('initial', []);
  },

  actions: {
    update(id) {
      const selected = this.get('selected');
      const initial = this.get('initial');
      const sectionRemovalAllowed = this.get('config.leadershipAllowCategoryRemoval');
      if (selected.includes(id) && !initial.includes(id)) {
        selected.removeObject(id);
      } else if (selected.includes(id) && initial.includes(id) && sectionRemovalAllowed) {
        selected.removeObject(id);
      } else if (!selected.includes(id)) {
        selected.pushObject(id);
      }
    },
    showModal() {
      this.set('isModalOpen', true);
    },
    transitionToPortal() {
      this.transitionToRoute('portal');
    },
  }
});
