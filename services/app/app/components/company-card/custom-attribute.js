import Component from '@ember/component';
import { get, set, computed } from '@ember/object';

export default Component.extend({
  tagName: 'div',
  classNames: ['row'],
  targetId: computed('key', function() {
    return `${this.key}-input`;
  }),
  targetHelp: computed('key', function() {
    return `${this.key}-help`;
  }),
  i18nLabel: computed('key', function() {
    return `customAttributes.${this.key}Label`;
  }),
  i18nDescription: computed('key', function() {
    return `customAttributes.${this.key}Description`;
  }),
  value: computed('key', 'model', {
    get() {
      return get(this, `model.${this.key}`);
    },
    set(_, value) {
      set(this.model, this.key, value);
      return value;
    }
  }),
});
