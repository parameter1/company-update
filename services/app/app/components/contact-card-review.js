import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['col-md-6 col-12'],
  original: null,
  updated: null,
  payload: null,

  canToggleCard: computed.or('isDeleted', 'isNew'),
  isCardEnabled: computed.reads('payload.enabled'),

  isDeleted: computed('updated', 'original', function() {
    return this.get('original') && !this.get('updated');
  }),

  isNew: computed('updated', 'original', function() {
    return this.get('updated') && !this.get('original');
  }),

  actions: {
    noop() {
    },
    toggleCard() {
      this.set('payload.enabled', !this.get('payload.enabled'));
    },
    toggleField(key) {
      this.set(`payload.fields.${key}`, !this.get(`payload.fields.${key}`));
    },
  },
});
