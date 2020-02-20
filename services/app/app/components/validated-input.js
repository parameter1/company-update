import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { debounce } from '@ember/runloop';
import ActionMixin from '../mixins/action';

export default Component.extend(ActionMixin, {
  tagName: '',
  valid: true,
  validated: false,
  pattern: null,

  classes: computed('valid', 'validated', function() {
    const classes = ['form-control'];
    const valid = this.get('valid');
    const validated = this.get('validated');
    if (validated) classes.push(valid ? 'is-valid': 'is-invalid');
    return classes.join(' ');
  }),

  /**
   * Performs validation of the passed value.
   * Pass a function to perform non-pattern-based validation.
   *
   * @param {*} value The value to validate
   */
  async validateFn(value) {
    if (this.pattern && value) {
      return (new RegExp(this.pattern)).test(value);
    }
    return true;
  },

  async validate(value) {
    if (typeof this.validateFn === 'function') {
      const valid = await this.validateFn(value);
      this.set('valid', valid);
      this.set('validated', value ? true : false);
    }
    this.endAction();
  },

  actions: {
    /**
     * Debounces and performs validation
     *
     * @todo debounce this
     * @param {Proxy} event
     */
    async validate(event) {
      const value = get(event, 'target.value');
      this.startAction();
      debounce(this, this.validate, value, 500);
    },
  },
});
