import Base from 'ember-simple-auth/authenticators/base';
import { inject } from '@ember/service';

export default Base.extend({
  auth: inject(),

  restore({ value }) {
    return this.auth.check(value);
  },

  authenticate(username, password) {
    return this.auth.submit(username, password);
  },

  invalidate({ value }) {
    return this.auth.delete(value);
  },
});
