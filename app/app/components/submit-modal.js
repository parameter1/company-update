import Component from '@ember/component';
import { computed } from '@ember/object';
import { ComponentQueryManager } from 'ember-apollo-client';
// import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';
import ActionMixin from 'cuf/mixins/action';
import mutation from 'cuf/gql/mutations/company';

const fields = [
  'address1',
  'address2',
  'body',
  'city',
  'country',
  'email',
  'fax',
  'name',
  'phone',
  'state',
  'tollfree',
  'website',
  'zip',
  'sectionIds',
  'logo',
];

const filterModel = (model = {}) => {
  const payload = {};
  fields.forEach(key => payload[key] = model.get(key));
  return payload;
};

export default Component.extend(ComponentQueryManager, ActionMixin, {
  model: null,

  name: 'j', // null,
  email: 'j@lol.io', // null,

  isOpen: false,
  isInvalid: computed('name', 'email', function() {
    if (!this.get('name') || !this.get('email')) return true;
    return false;
  }),
  isSubmitDisabled: computed.or('isActionRunning', 'isInvalid'),

  actions: {
    async submit() {
      this.startAction();
      const { name, email } = this.getProperties('name', 'email');
      const hash = this.get('model.hash');
      const payload = filterModel(this.get('model'));
      const variables = { input: { name, email, hash, payload } };

      try {
        await this.get('apollo').mutate({ mutation, variables });
        if (!this.isDestroyed) this.set('isOpen', false);
        this.get('notify').info('Changes submitted');
        this.sendAction('onComplete');
      } catch (e) {
        console.error(e);
        this.get('notify').alert('Something went wrong -- please review your information and try again!', { closeAfter: null });
      } finally {
        this.endAction();
      }
    },

    clear() {
    },
  },

});
