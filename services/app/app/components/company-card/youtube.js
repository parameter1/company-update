import Component from '@ember/component';
import { computed } from '@ember/object';
import { queryManager } from 'ember-apollo-client';
import queryPlaylistId from '@base-cms/company-update-app/gql/queries/youtube/playlist-id';
import queryChannelId from '@base-cms/company-update-app/gql/queries/youtube/channel-id';
import queryUsername from '@base-cms/company-update-app/gql/queries/youtube/username';

export default Component.extend({
  apollo: queryManager(),
  tagName: 'div',
  classNames: ['card mb-3'],

  async validatePlaylistId(playlistId) {
    if (!playlistId) return true;
    const variables = { input: { playlistId } };
    const result = await this.apollo.query({ query: queryPlaylistId, variables });
    if (!result.validateYoutubePlaylistId) {
      this.set('model.youtube.playlistId', null);
    }
    return result.validateYoutubePlaylistId;
  },

  async validateChannelId(channelId) {
    if (!channelId) return true;
    const variables = { input: { channelId } };
    const result = await this.apollo.query({ query: queryChannelId, variables });
    if (!result.validateYoutubeChannelId) {
      this.set('model.youtube.channelId', null);
    }
    return result.validateYoutubeChannelId;
  },

  async validateUsername(username) {
    if (!username) return true;
    
    const variables = { input: { username }};
    const result = await this.apollo.query({ query: queryUsername, variables });
    if (!result.validateYoutubeUsername) {
      this.set('model.youtube.username', null);
    }
    return result.validateYoutubeUsername;
  },

  url: computed('model.youtube.{playlistId,channelId,username}', function() {
    const { playlistId, channelId, username } = this.get('model.youtube');
    if (playlistId) return `https://www.youtube.com/playlist?list=${playlistId}`;
    if (channelId) return `https://www.youtube.com/channel/${channelId}`;
    if (username) return `https://www.youtube.com/user/${username}`;
    return '';
  }),
});
