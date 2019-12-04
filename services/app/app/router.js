import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('portal', { path: 'portal/:hash' }, function() {
    // this.route('products');
    // this.route('contacts');
    this.route('categories');
    this.route('company', function() {
      this.route('categories');
    });
    this.route('thanks');
  });
  this.route('review', { path: '/review/:id' });
  this.route('login');
  this.route('list');
  this.route('logout');
});
