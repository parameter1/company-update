import Controller from '@ember/controller';
import { computed, get, set } from '@ember/object';
import { inject } from '@ember/service';

import ActionMixin from '../../mixins/action';
import discard from '../../gql/mutations/discard';

export default Controller.extend(ActionMixin, {
  apollo: inject(),
  notify: inject(),
  disabled: computed.reads('isActionRunning'),
  isPublishing: false,
  isDiscarding: false,

  isPublishDisabled: computed('isDisabled', 'model.{categories.length}', function() {
    if (!this.get('model.categories.length')) return true;
    return this.get('isDisabled');
  }),

  isDisabled: computed('isActionRunning', 'model.submission.reviewed', function() {
    if (this.get('model.submission.reviewed')) return true;
    return this.get('isActionRunning');
  }),

  sites: computed('model.sections.[]', function() {
    const sites = this.get('model.sections');
    const sections = (get(sites, 'edges') || []).map(({ node }) => node);
    const reduced = sections.reduce((obj, section) => {
      const { id, name } = section.site;
      if (obj[id]) {
        obj[id].sections.pushObject(section);
      } else {
        obj[id] = { id, name, sections: [section] };
      }
      return obj;
    }, {});
    return Object.keys(reduced).map(id => reduced[id]).sort((a, b) => a.name.localeCompare(b.name));
  }),

  selected: computed.reads('model.categories'),

  actions: {
    toggleSection(id) {
      const selected = this.get('selected') || [];
      if (selected.includes(id)) {
        selected.removeObject(id);
      } else {
        selected.pushObject(id);
      }
    },
    async publish() {
      this.startAction();
      set(this, 'isPublishing', true);
      try {
        const selected = this.get('selected');
        console.log({ selected });
        if (this.isPublishing) throw new Error('NYI');
        set(this, 'model.submission.reviewed', true);
        this.notify.success('Changes have been published!');
        this.transitionToRoute('list');
      } catch (e) {
        const msg = get(e, 'errors.0.message');
        this.notify.error(msg || 'Unable to submit', { autoClear: false });
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
        const msg = get(e, 'errors.0.message');
        this.notify.error(msg || 'Unable to discard', { autoClear: false });
      } finally {
        set(this, 'isDiscarding', false);
        this.endAction();
      }
    },
  },
});
