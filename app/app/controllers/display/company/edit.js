import Controller from 'cuf/controllers/display/company';
import { computed } from '@ember/object';

export default Controller.extend({
  title: computed('model', function() {
    return `${this.get('model.name')}`;
  }),
});
