import Component from '@ember/component';
import ActionMixin from '@base-cms/company-update-app/mixins/action';
import mutation from '@base-cms/company-update-app/gql/mutations/upload';
import { inject } from '@ember/service';

const { error } = console;

export default Component.extend(ActionMixin, {
  apollo: inject(),
  notify: inject(),
  document: null,

  actions: {
    async upload(file) {
      const document = this.get('document');
      this.startAction();
      const variables = { file: file.get('blob') };

      try {
        const location = await this.apollo.mutate({ mutation, variables }, 'companyUpdateSingleUpload');
        this.onUpload(location);
      } catch (e) {
        this.set('document', document);
        error('upload error', e, file);
        this.notify.error(`Something went wrong -- please try again!<br>${e.message}`, { autoClear: false, htmlContent: true });
      } finally {
        file.queue.remove(file);
        this.endAction();
      }
    },
  },

});
