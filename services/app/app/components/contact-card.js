import Component from '@ember/component';

export default Component.extend({
  classNames: ['col-md-6 col-12'],

  actions: {
    remove() {
      this.onRemove();
    },
    onUpload(src) {
      this.set('contact.primaryImage', { src });
    }
  },
});
