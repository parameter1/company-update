import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  config: inject(),
  classNames: ['col-md-6 col-12'],
  original: null,
  updated: null,
  payload: null,

  canToggleCard: computed.or('isDeleted', 'isNew'),
  isCardEnabled: computed.reads('payload.enabled'),
  originalIncludedLabel: computed('original', function() {
    return Array.isArray(this.get('original.labels')) ? this.get('original.labels').includes(this.config.documentLabelOption) : false;
  }),
  updatedIncludedLabel: computed('updated', function() {
    return Array.isArray(this.get('updated.labels')) ? this.get('updated.labels').includes(this.config.documentLabelOption) : false;
  }),

  isDeleted: computed('updated', 'original', function() {
    return this.get('original') && !this.get('updated');
  }),

  isNew: computed('updated', 'original', function() {
    return this.get('updated') && !this.get('original');
  }),

  actions: {
    toggleCard() {
      this.set('payload.enabled', !this.get('payload.enabled'));
    },
    toggleField(key) {
      this.set(`payload.fields.${key}`, !this.get(`payload.fields.${key}`));
    },
  },
});
