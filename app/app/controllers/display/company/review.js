import Controller from 'cuf/controllers/display/company';
import { computed } from '@ember/object';

export default Controller.extend({
  options: { toolbarButtons: [] },
  body: computed('model.submission.payload.body', function() {
    return `<div contenteditable=false>${this.get('model.submission.payload.body')}</div>`;
  }),
});
