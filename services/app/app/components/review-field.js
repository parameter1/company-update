import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['input-group'],
  tagName: 'div',
  original: null,
  updated: null,
  fieldKey: null,
  long: false,

  approvable: computed('original', 'updated', function() {
    return this.get('original') != this.get('updated');
  }),

  isChecked: computed('enabled', function() {
    const v = this.get('enabled');
    return Boolean(v);
  }),

  actions: {
    toggle() {
      this.toggleField(this.get('fieldKey'));
    },
  },

});
