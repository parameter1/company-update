import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import ActionMixin from '@base-cms/company-update-app/mixins/action';

export default Component.extend(ActionMixin, {
  config: inject(),
  notify: inject(),
  classNames: ['col-12 mb-3'],
  site: null,

  init() {
    this._super(...arguments);
    this.set('_selected', []);
  },

  sections: computed.reads('site.sections'),

  actions: {
    toggle(id) {
      this.onUpdate(id);
    }
  }

});
