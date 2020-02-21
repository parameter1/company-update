import Component from '@ember/component';

const toolbarButtons = [['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript']];

export default Component.extend({
  tagName: 'div',
  classNames: ['card mb-3'],
  toolbarButtons,
});
