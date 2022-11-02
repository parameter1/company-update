import Component from '@ember/component';
import { computed } from '@ember/object';
import ActionMixin from '@base-cms/company-update-app/mixins/action';

const { error } = console;

export default Component.extend(ActionMixin, {
  classNameBindings: ['root:tree-wrapper', 'root:border', 'root:p-2'],
  node: null,
  root: false,
  collapsed: true,
  onUpdate: () => error('onUpdate missing!'),

  rootClass: computed('root', function() {
    return this.root ? 'tree-inner' : '';
  }),

  checked: computed('selectedIds.[]', 'node.id', function() {
    const ids = this.selectedIds || [];
    const id = this.node.id;
    return ids.includes(id);
  }),

  actions: {
    collapse() {
      this.set('collapsed', !this.collapsed);
    },
    update() {
      this.onUpdate(this.node.id);
    },
  },
});
