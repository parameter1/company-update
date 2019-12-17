import Component from '@ember/component';
import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';

const toolbarButtons = ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'];

export default Component.extend({
  tagName: 'div',
  classNames: ['card mb-3'],
  title: 'Company Details',
  toolbarButtons,
  teaser: computed('model.teaser', function() {
    return htmlSafe(this.get('model.teaser'));
  }),
  body: computed('model.body', function() {
    return htmlSafe(this.get('model.body'));
  }),
});
