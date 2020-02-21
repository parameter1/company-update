import Component from '@ember/component';
import { computed } from '@ember/object';

/**
 * Restricted API key providing access to the v3 Youtube Data API from pre-defined domains
 * Approved for limited public distribution
 */
const youtubeApiKey = 'AIzaSyDbUy51sMbUsA678QAIaWd_1OQ2SejNa8g';

export default Component.extend({
  tagName: 'div',
  classNames: ['card mb-3'],
  title: 'Youtube Videos',

  async validatePlaylistId(value) {
    if (!value) return true;
    const url = `https://www.googleapis.com/youtube/v3/playlists?part=id&id=${value}&key=${youtubeApiKey}`;
    const r = await fetch(url);
    if (!r.ok) return false;
    const json = await r.json();
    return json.items.length > 0;
  },

  async validateChannelId(value) {
    if (!value) return true;
    const url = `https://www.googleapis.com/youtube/v3/channels?part=id&id=${value}&key=${youtubeApiKey}`;
    const r = await fetch(url);
    if (!r.ok) return false;
    const json = await r.json();
    return json.items.length > 0;
  },

  async validateUsername(value) {
    if (!value) return true;
    const url = `https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=${value}&key=${youtubeApiKey}`;
    const r = await fetch(url);
    if (!r.ok) return false;
    const json = await r.json();
    return json.items.length > 0;
  },

  url: computed('model.youtube.{playlistId,channelId,username}', function() {
    const { playlistId, channelId, username } = this.get('model.youtube');
    if (playlistId) return `https://www.youtube.com/playlist?list=${playlistId}`;
    if (channelId) return `https://www.youtube.com/channel/${channelId}`;
    if (username) return `https://www.youtube.com/user/${username}`;
    return '';
  }),
});
