import Service from '@ember/service';
import { queryManager } from 'ember-apollo-client';

import activeUser from 'cuf/gql/queries/active-user';
import logout from 'cuf/gql/mutations/logout';
import login from 'cuf/gql/mutations/login';

export default Service.extend({
  apollo: queryManager(),
  /**
   * Checks the current session.
   *
   * @param {string} token
   * @return {Promise}
   */
  async check(value) {
    const user = await this.apollo.query({
      query: activeUser,
      fetchPolicy: 'network-only',
      // @todo make this automatic.
      context: { headers: { authorization: `Bearer ${value}` } }
    }, 'activeUser');
    if (!user) throw new Error('Invalid user');
    return { value, ...user };
  },

  /**
   * Submits authentication credentials (logs a user in).
   *
   * @param {string} email
   * @param {string} password
   * @return {Promise}
   */
  submit(username, password) {
    const variables = { input: { username, password } };
    return this.apollo.mutate({ mutation: login, variables }, 'login');
  },

  /**
   * Deletes the current auth session token.
   *
   * @return {Promise}
   */
  delete(value) {
    return this.apollo.mutate({
      mutation: logout,
      // @todo make this automatic.
      context: { headers: { authorization: `Bearer ${value}` } }
    }, 'logout');
  },
});
