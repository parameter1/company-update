import Component from '@ember/component';
import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';
import { inject } from '@ember/service';


const toolbarButtons = ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'];
const htmlAllowedTags = ['a', 'b', 'strong', 'em', 'i', 'u', 's', 'sub', 'sup', 'strike'];

export default Component.extend({
  config: inject(),
  companyDetailsExtraFieldsEnabled: computed.reads('config.companyDetailsExtraFieldsEnabled'),
  tagName: 'div',
  classNames: ['card mb-3'],
  toolbarButtons,
  htmlAllowedTags,
  teaser: computed('model.teaser', function() {
    return htmlSafe(this.get('model.teaser'));
  }),
  body: computed('model.body', function() {
    return htmlSafe(this.get('model.body'));
  }),
});
