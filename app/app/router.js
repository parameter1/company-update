import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('display', function() {
    this.route('company', { path: 'company/:hash' }, function() {
      this.route('edit', { path: '' }, function() {
        this.route('categories');
      });
      this.route('review', { path: ':id' });
      this.route('thanks');
    });
  });
});

export default Router;
