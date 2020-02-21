import Component from '@ember/component';

export default Component.extend({
  classNames: 'row',
  link: null,
  payload: null,
  original: null,
  updated: null,
  toggleField: () => { throw new Error('Pass toggleField!'); },
});
