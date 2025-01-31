import Component from '@ember/component';

export default Component.extend({
  classNames: ['col-md-6 col-12'],
  document: null,
  _document: null,

  init() {
    this._super(...arguments);
    const {
      name,
      teaser,
      fileSrc,
      labels,
    } = this.get('document');
    this.set('_document', {
      name,
      teaser,
      ...(fileSrc && { fileSrc } || { fileSrc: null }),
      ...((Array.isArray(labels) && labels.length) && { labels } || { labels: {} })
    });
  },

  actions: {
    remove() {
      this.onRemove();
    },
    onChange(field) {
      const original = this.get(`document.${field}`);
      const updated = this.get(`_document.${field}`);
      if (original === updated) {
        this.onReset(field);
      } else {
        this.onUpdate(field, updated);
      }
    },
    onUpload(fileSrc) {
      this.set('_document.fileSrc', fileSrc);
      this.onUpdate('fileSrc', fileSrc);
    }
  },
});
