import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['col-md-4 col-sm-6 col-12 form-group'],
  section: null,

  isConflicting: computed('sectionIds.[]', 'selected.[]', 'section.id', function() {
    const id = this.get('section.id');
    if (!this.get('selected').includes(id)) return false;
    return this.get('sectionIds').includes(id);
  }),

  disabled: computed('canSelect', function() {
    return !this.get('canSelect');
  }),
  checked: computed('selected.[]', 'section.id', function() {
    const id = this.get('section.id');
    return this.get('selected').includes(id);
  }),
  init() {
    this._super();
    if (!this.get('selected')) this.set('selected', []);
  },
  actions: {
    toggle(id) {
      this.onToggle(id);
    }
  }
});
