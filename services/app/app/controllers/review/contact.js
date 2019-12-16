import Controller from '@ember/controller';
import { computed, get, set } from '@ember/object';
import { inject } from '@ember/service';

import ActionMixin from '../../mixins/action';
import discard from '../../gql/mutations/discard';
import publish from '../../gql/mutations/review/leadership';

export default Controller.extend(ActionMixin, {
  apollo: inject(),
  notify: inject(),
  disabled: computed.reads('isActionRunning'),
  isPublishing: false,
  isDiscarding: false,

  isDisabled: computed('isActionRunning', 'model.submission.reviewed', function() {
    if (this.get('model.submission.reviewed')) return true;
    return this.get('isActionRunning');
  }),

  payload: null,

  actions: {
    toggleField() {

    },
    toggleContact() {

    },
    async publish() {
      this.startAction();
      set(this, 'isPublishing', true);
      try {
        const contacts = this.get('model.contacts');
        console.log(contacts);
        throw new Error('NYI');


        set(this, 'model.submission.reviewed', true);
        await this.apollo.mutate({ mutation: discard, variables: { id }, refetchQueries: ['ContentUpdateListSubmissions'] });
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
