import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',
  type: null,

  icon: computed('type', function() {
    const type = this.get('type');
    switch (type) {
      case 'leadership':
        return 'tag';
      case 'promotion':
        return 'documents';
      case 'contact':
        return 'users';
      case 'product':
        return 'cog';
      case 'directory':
        return 'list';
    }
    return 'briefcase';
  }),
});
