import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  config: inject(),
  classNames: ['input-group'],
  tagName: 'div',
  original: null,
  updated: null,
  fieldKey: null,
  long: false,
  _approvable: true,

  value: computed('original', 'updated', function() {
    return this.get('original') || this.get('updated');
  }),

  approvable: computed('_approvable', 'original', 'updated', function() {
    if (!this.get('_approvable')) return false;
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
