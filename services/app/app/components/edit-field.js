import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  field: null,
  value: null,

  classNames: [ 'col '],
  classNameBindings: ['columns'],
  columns: computed.reads('field.class'),
});
