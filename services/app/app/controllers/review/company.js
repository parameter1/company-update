import Controller from '@ember/controller';
import { computed, get, set } from '@ember/object';

export default Controller.extend({
  payload: computed('model.submission.payload', function() {
    const payload = this.get('model.submission.payload') || {};
    const company = this.get('model.company');
    return Object.keys(payload).reduce((obj, k) => {
      const pv = get(payload, k);
      const cv = get(company, k);
      return pv == cv ? obj : { ...obj, [k]: true };
    }, {});
  }),

  actions: {
    toggleField(key) {
      const v = Boolean(this.get(`payload.${key}`));
      set(this, `payload.${key}`, !v);
    },
    publish() {
      const payload = this.get('payload');
      const keys = Object.keys(payload || {});
      console.log('publish', keys);
      const input = keys.reduce((obj, k) => {
        const include = Boolean(get(payload, k));
        const v = get(this, `model.submission.payload.${k}`);
        return include ? { ...obj, [k]: v } : obj;
      }, {});
      console.log('publish', { input });
    },
    delete() {
      console.log('delete');
    },
  },
});
