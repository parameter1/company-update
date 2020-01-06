import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { queryManager } from 'ember-apollo-client';
import ActionMixin from '@base-cms/company-update-app/mixins/action';
import mutation from '@base-cms/company-update-app/gql/mutations/portal/leadership';

const { error } = console;

export default Component.extend(ActionMixin, {
  apollo: queryManager(),
  notify: inject(),
  session: inject(),
  categories: null,
  hash: null,

  name: computed.reads('session.data.authenticated.name'),
  email: computed.reads('session.data.authenticated.email'),

  isOpen: false,
  isInvalid: computed('name', 'email', function() {
    if (!this.name || !this.email) return true;
    return false;
  }),
  isSubmitDisabled: computed.or('isActionRunning', 'isInvalid'),

  actions: {
    async submit() {
      this.startAction();
      const { name, email, hash, categories } = this.getProperties('name', 'email', 'hash', 'categories');
      const payload = { categories };
      const type = 'leadership';
      const variables = { input: { name, email, hash, type, payload } };

      try {
        await this.apollo.mutate({ mutation, variables });
        if (!this.isDestroyed) this.set('isOpen', false);
        this.notify.info('Changes requested. You will recieve an email shortly confirming your request.', { clearDuration: 30000 });
        this.onComplete();
      } catch (e) {
        error(e);
        this.notify.error(`Something went wrong -- please review your information and try again!<br>${e.message}`, { autoClear: false, htmlContent: true });
      } finally {
        this.endAction();
      }
    },

    clear() {
    },
  },

});
