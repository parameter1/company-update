import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
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

  init() {
    this._super(...arguments);
    if (typeof this.toggleField !== 'function') {
      throw new Error('You must pass a toggleField function to this component.');
    }
  },

  actions: {
    toggle() {
      this.toggleField(this.get('fieldKey'));
    },
  },

});
