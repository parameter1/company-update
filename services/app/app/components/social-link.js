import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  choices: undefined,
  tagName: 'li',
  classNames: ['list-group-item'],
  link: null,

  selected: computed('link.provider', 'choices.[]', function() {
    const provider = this.get('link.provider');
    return this.get('choices').filter(({ value }) => value === provider).pop();
  }),

  setProvider(e) {
    this.set('link.provider', e);
  },

  init() {
    this._super(...arguments);
    this.set('choices', [
      { value: 'facebook', label: 'Facebook' },
      { value: 'instagram', label: 'Instagram' },
      { value: 'linkedin', label: 'LinkedIn' },
      { value: 'pinterest', label: 'Pinterest' },
      { value: 'twitter', label: 'Twitter' },
      { value: 'youtube', label: 'Youtube' },
      { value: 'other', label: 'Other' },
    ]);
  },
  actions: {
    remove() {
      this.onRemove(this.get('link'));
    },
  },
});
