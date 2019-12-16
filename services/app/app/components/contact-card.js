import Component from '@ember/component';

export default Component.extend({
  classNames: ['col-md-6 col-12'],
  contact: null,
  _contact: null,

  init() {
    this._super(...arguments);
    const {
      firstName,
      lastName,
      title,
      primaryImage,
    } = this.get('contact');
    this.set('_contact', {
      firstName,
      lastName,
      title,
      ...(primaryImage && { primaryImage: { src: primaryImage.src } }),
    });
  },

  actions: {
    remove() {
      this.onRemove();
    },
    onChange(field) {
      const original = this.get(`contact.${field}`);
      const updated = this.get(`_contact.${field}`);
      if (original === updated) {
        this.onReset(field);
      } else {
        this.onUpdate(field, updated);
      }
    },
    onUpload(src) {
      this.set('_contact.primaryImage', { src });
      this.onUpdate('primaryImage', { src });
    }
  },
});
