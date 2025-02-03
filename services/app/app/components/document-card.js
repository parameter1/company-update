import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  config: inject(),
  classNames: ['col-md-6 col-12'],
  document: null,
  _document: null,
  includeLabel: false,

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
      ...((Array.isArray(labels) && labels.length) && { labels } || { labels: [] })
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
    },
    labelToggle() {
      this.set('includeLabel', !this.get('includeLabel'));
      if (this.get('includeLabel')) {
        this.onUpdate('labels', [...this.get('document.labels').filter((v) => v !== this.config.documentLabelOption), this.config.documentLabelOption])
      } else {
        this.onUpdate('labels', [...this.get('document.labels').filter((v) => v !== this.config.documentLabelOption)]);
      }
    }
  },
});
