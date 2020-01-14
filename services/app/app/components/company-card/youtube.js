import Component from '@ember/component';
import { set, computed } from '@ember/object';

export default Component.extend({
  tagName: 'div',
  classNames: ['card mb-3'],
  title: 'Youtube Videos',

  url: computed('model.youtube.{playlistId,channelId,username}', function() {
    const { playlistId, channelId, username } = this.get('model.youtube');
    if (playlistId) return `https://www.youtube.com/playlist?list=${playlistId}`;
    if (channelId) return `https://www.youtube.com/channel/${channelId}`;
    if (username) return `https://www.youtube.com/user/${username}`;
    return '';
  }),

  init() {
    this._super();
    if (!this.get('model.youtube')) set(this.get('model'), 'youtube', {});
  },
});
