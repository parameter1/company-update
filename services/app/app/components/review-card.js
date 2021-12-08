import Component from '@ember/component';

const toolbarButtons = [['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript']];

/**
 * Required props for extending components
 *
 * @param {Object} company        The current (live) company object.
 * @param {Object} submission     The submission under review.
 * @param {Object} payload        The active payload to be submitted to Base
 * @param {Function} toggleField  Ember action passed to `review-field` component
 */
export default Component.extend({
  tagName: 'div',
  classNames: ['card mb-3'],
  toolbarButtons,
});
