import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  diff: null,

  classNameBindings: ['diff.added:text-success', 'diff.removed:text-danger', 'text-muted'],

  value: computed('diff.value', function() {
    return htmlSafe(this.get('diff.value'));
  }),

  tagName: computed('diff.{added,removed}', function() {
    const { added, removed } = this.getProperties(['diff.added', 'diff.removed']);
    if (added) return 'ins';
    if (removed) return 'del';
    return 'span';
  }),

});
