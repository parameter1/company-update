import Component from '@ember/component';
import ActionMixin from '@base-cms/company-update-app/mixins/action';
import mutation from '@base-cms/company-update-app/gql/mutations/upload';
import { inject } from '@ember/service';

const { error } = console;

export default Component.extend(ActionMixin, {
  apollo: inject(),
  notify: inject(),
  image: null,

  actions: {
    async upload(file) {
      const image = this.get('image');
      this.startAction();
      const variables = { file: file.get('blob') };

      try {
        // file.readAsDataURL().then(url => this.set('image', url));
        const location = await this.apollo.mutate({ mutation, variables }, 'companyUpdateSingleUpload');
        this.onUpload(location);
      } catch (e) {
        this.set('image', image);
        error('upload error', e, file);
        this.notify.error('Something went wrong -- please try again!', { autoClear: false });
      } finally {
        file.queue.remove(file);
        this.endAction();
      }
    },
  },

});
