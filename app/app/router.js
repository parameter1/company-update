import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('company', { path: 'display/company/:hash' }, function() {
    this.route('review', { path: ':id' });
  });
});

export default Router;
