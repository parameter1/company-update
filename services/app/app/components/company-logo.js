import Component from '@ember/component';
import ActionMixin from 'cuf/mixins/action';
import mutation from 'cuf/gql/mutations/upload';
import { inject } from '@ember/service';

const { error } = console;

export default Component.extend(ActionMixin, {
  apollo: inject(),
  logo: null,

  actions: {
    async upload(file) {
      const logo = this.get('logo');
      this.startAction();
      const variables = { file: file.get('blob') };

      try {
        file.readAsDataURL().then(url => this.set('logo', url));
        const location = await this.apollo.mutate({ mutation, variables }, 'companyUpdateSingleUpload');
        this.set('logo', location);
      } catch (e) {
        this.set('logo', logo);
        error('upload error', e, file);
        this.get('notify').alert('Something went wrong -- please try again!');
      } finally {
        file.queue.remove(file);
        this.endAction();
      }
    },
  },

});
