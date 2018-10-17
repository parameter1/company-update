import Component from '@ember/component';
import { computed } from '@ember/object';
import { ComponentQueryManager } from 'ember-apollo-client';
import ActionMixin from 'cuf/mixins/action';
import mutation from 'cuf/gql/mutations/upload';

export default Component.extend(ComponentQueryManager, ActionMixin, {
  logo: null,

  actions: {
    async upload(file) {
      const logo = this.get('logo');
      this.startAction();
      const { blob } = file;
      const variables = { file: blob };

      try {
        file.readAsDataURL().then(url => this.set('logo', url));
        const location = await this.get('apollo').mutate({ mutation, variables }, 'singleUpload');
        this.set('logo', location);
      } catch (e) {
        this.set('logo', logo);
        console.error('upload error', e, file);
        this.get('notify').alert('Something went wrong -- please try again!');
      } finally {
        file.queue.remove(file);
        this.endAction();
      }
    },
  },

});
