import Controller from 'cuf/controllers/display/company';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

import mutation from 'cuf/gql/mutations/complete';

export default Controller.extend({
  apollo: inject(),
  body: computed('model.submission.payload.body', function() {
    return `<div contenteditable=false>${this.get('model.submission.payload.body')}</div>`;
  }),
  init() {
    this._super(...arguments);
    this.set('options', {
      toolbarButtons: []
    });
  },
  actions: {
    async done() {
      try {
        const id = this.get('model.submission.id');
        await this.get('apollo').mutate({ mutation, variables: { id } });
        this.get('notify').info('Marked as done!');
        this.set('model.submission.reviewed', true);
      } catch (e) {
        console.error(e); // eslint-disable-line no-console
        this.get('notify').alert('Something went wrong -- please try again!', { closeAfter: null });
      }
    },
  },
});
