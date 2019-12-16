import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['all'],
  all: false,
  actions: {
    toggleAll() {
      this.set('all', !this.get('all'));
    }
  },
});
