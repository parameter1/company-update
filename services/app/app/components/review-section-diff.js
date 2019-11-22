import Component from '@ember/component';
import { ComponentQueryManager } from 'ember-apollo-client';
import ActionMixin from 'cuf/mixins/action';
import { computed } from '@ember/object';

import query from 'cuf/gql/queries/sections';

export default Component.extend(ComponentQueryManager, ActionMixin, {
  classNames: ['list-group list-group-flush'],
  tagName: 'ul',
  loaded: false,
  ids: computed.uniq('current', 'old'),
  items: computed.reads('sections.[]'),

  async loadSections() {
    // this.startAction();
    try {
      const ids = this.get('ids');
      const variables = { input: { includeIds: ids } };
      const sections = await this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'cache-and-network' }, 'websiteSections.edges');
      this.set('sections', sections);
    } finally {
      // this.endAction();
    }
  },

  init() {
    this._super(...arguments);
    this.set('current', []);
    this.set('old', []);
    this.set('sections', []);
    this.loadSections();
  },


});
