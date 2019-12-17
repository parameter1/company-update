import ApolloService from 'ember-apollo-client/services/apollo';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { inject } from '@ember/service';

export default ApolloService.extend({
  session: inject(),

  link() {
    const authLink = setContext((_, context) => this._runAuthorize(context));
    const uri = this.get('options.apiURL');
    const uploadLink = createUploadLink({ uri });
    return authLink.concat(uploadLink);
  },

  async _runAuthorize({ headers: prev } = { }) {
    const headers = prev || {};
    const token = await this.get('session.data.authenticated.value');
    const isAuthenticated = await this.get('session.isAuthenticated');
    if (!isAuthenticated || !token) return { headers };
    return { headers: { ...headers, authorization: `Bearer ${token}`} };
  },
});
