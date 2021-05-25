import Component from '@ember/component';

export default Component.extend({
  tagName: 'div',
  classNames: ['card mb-3'],

  init() {
    this._super(...arguments);
    this.set('links', this.get('links') || []);
  },

  actions: {
    add() {
      this.get('links').pushObject({});
    },
    remove(link) {
      this.get('links').removeObject(link);
    }
  },
});
