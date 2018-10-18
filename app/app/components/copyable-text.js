import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  notify: inject(),
  classNames: 'input-group-append',

  value: null,

  success() {
    this.get('notify').success('Text copied to clipboard');
  },
});
