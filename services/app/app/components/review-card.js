import Component from '@ember/component';

const { log } = console;
const toolbarButtons = [['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript']];

export default Component.extend({
  tagName: 'div',
  classNames: ['card mb-3'],
  toolbarButtons,
  toggleField: () => log('Pass toggleField!'),
});
