import Component from '@ember/component';
import { computed } from '@ember/object';
// import JsDiff from 'diff';

export default Component.extend({
  lines: true,
  original: null,
  updated: null,

  diffs: computed('original,updated,lines', function() {
    const original = this.get('original') || '';
    let updated = this.get('updated') || '';
    if (typeof this.get('updated') === 'undefined') updated = original;
    if (this.get('lines')) return JsDiff.diffLines(original, updated, { newlineIsToken: true });
    return JsDiff.diffWordsWithSpace(original, updated);
  })
});
