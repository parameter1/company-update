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
    onChange(field, value) {
      if (this.get(`contact.${field}`) === this.get(`_contact.${field}`)) {
        this.onReset(field);
      } else {
        this.onUpdate(field, value);
      }
    },
    onUpload(src) {
      this.set('_contact.primaryImage', { src });
      this.onUpdate('primaryImage', { src });
    }
  },
});
