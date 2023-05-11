import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('portal', { path: 'portal/:hash' }, function() {
    this.route('products');
    this.route('contacts');
    this.route('leadership');
    this.route('directory');
    this.route('directory-sections');
    this.route('promotions');
    this.route('company');
  });
  this.route('review', { path: '/review/:id' }, function () {
    this.route('company');
    this.route('directory');
    this.route('directory-sections');
    this.route('leadership');
    this.route('product');
    this.route('contact');
    this.route('promotion');
  });
  this.route('login');
  this.route('list');
  this.route('logout');
});
