import ApolloService from 'ember-apollo-client/services/apollo';
import { computed } from '@ember/object';
import { createUploadLink } from 'apollo-upload-client';

export default ApolloService.extend({
  link: computed(function() {
    const uri = this.get('apiURL');
    return createUploadLink({ uri });
  }),
});
