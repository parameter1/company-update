import Component from '@ember/component';

const { log } = console;

export default Component.extend({
  classNames: 'row',
  link: null,
  payload: null,
  original: null,
  updated: null,
  toggleField: () => log('Pass toggleField!'),
});
