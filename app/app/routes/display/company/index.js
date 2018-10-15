import Route from '@ember/routing/route';

export default Route.extend({
  setupController(controller, model) {
    this._super(controller, model);
    const { hash } = model;
    controller.set('submission', { hash, payload: {} });
  },
});
