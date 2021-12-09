import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'div',
  classNames: ['card mb-3'],
  categoryName: computed('title', function() {
    const title = this.title;
    return title !== 'null' ? title : '';
  }),
});
