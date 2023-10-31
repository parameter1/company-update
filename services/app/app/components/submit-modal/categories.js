import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { queryManager } from 'ember-apollo-client';
import ActionMixin from '@base-cms/company-update-app/mixins/action';
import mutation from '@base-cms/company-update-app/gql/mutations/portal/leadership';
import getGraphqlError from '../../utils/get-graphql-error';

const { error } = console;

export default Component.extend(ActionMixin, {
  apollo: queryManager(),
  notify: inject(),
  session: inject(),
  config: inject(),
  hash: null,

  name: null,
  email: null,
  error: null,

  isOpen: false,
  isInvalid: computed('name', 'email', function() {
    if (!this.name || !this.email) return true;
    return false;
  }),
  isSubmitDisabled: computed.or('isActionRunning', 'isInvalid'),

  categoryPrefix: computed.reads('config.leadershipCategoryPrefix'),

  actions: {
    async submit() {
      this.startAction();
      this.set('error', null);
      const {
        name,
        email,
        hash,
        payload
      } = this.getProperties('name', 'email', 'hash', 'payload');
      const type = 'leadership';
      const variables = { input: { name, email, hash, type, payload } };

      try {
        await this.apollo.mutate({ mutation, variables });
        if (!this.isDestroyed) this.set('isOpen', false);
        this.notify.info('Changes requested. You will recieve an email shortly confirming your request.', { clearDuration: 30000 });
        this.onComplete();
      } catch (e) {
        error(e);
        const err = getGraphqlError(e);
        this.set('error', err);
        this.notify.error(`Something went wrong -- please review your information and try again!`, { autoClear: false });
      } finally {
        this.endAction();
      }
    },

    clear() {
    },
  },

});
