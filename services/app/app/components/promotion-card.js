import Component from '@ember/component';

export default Component.extend({
  classNames: ['col-md-6 col-12'],
  promotion: null,
  _promotion: null,

  init() {
    this._super(...arguments);
    const {
      linkText,
      linkUrl,
      name,
      primaryImage,
    } = this.get('promotion');
    this.set('_promotion', {
      linkText,
      linkUrl,
      name,
      ...(primaryImage && { primaryImage: { src: primaryImage.src } } || { primaryImage: { src: null } }),
    });
  },

  validateLinkUrl(value) {
    if (!value) return false;
    return /https:\/\/.+/.test(value);
  },

  actions: {
    remove() {
      this.onRemove();
    },
    onChange(field) {
      const original = this.get(`promotion.${field}`);
      const updated = this.get(`_promotion.${field}`);
      if (original === updated) {
        this.onReset(field);
      } else {
        this.onUpdate(field, updated);
      }
    },
    onUpload(src) {
      this.set('_promotion.primaryImage', { src });
      this.onUpdate('primaryImage', { src });
    }
  },
});
