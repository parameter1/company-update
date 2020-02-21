import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { inject } from '@ember/service';
import { queryManager } from 'ember-apollo-client';
import ActionMixin from '@base-cms/company-update-app/mixins/action';
import mutation from '@base-cms/company-update-app/gql/mutations/portal/company';
import getGraphqlError from '../../utils/get-graphql-error';

const { error } = console;

const getExternalLinks = (v) => v
  .map(link => ({ key: link.key, url: link.url }))
  .filter(link => link.key && link.url);

const getSocialLinks = (v) => v
  .map(link => ({ url: link.url, provider: link.provider }))
  .filter(link => link.url && link.provider);

const getSocialFields = ({ playlistId, channelId, username }) => ({
  playlistId,
  channelId,
  username,
});

const getFiltered = (model, key) => {
  const v = get(model, key);
  if (key == 'externalLinks') return getExternalLinks(v);
  if (key == 'socialLinks') return getSocialLinks(v);
  if (key == 'youtube') return getSocialFields(v);
  return v;
};

const fields = [
  'name',
  'address1',
  'address2',
  'city',
  'state',
  'zip',
  'country',
  'phone',
  'tollfree',
  'fax',
  'website',
  'type',
  'email',
  'body',
  'socialLinks',
  'externalLinks',
  'teaser',
  'numberOfEmployees',
  'trainingInformation',
  'yearsInOperation',
  'salesRegion',
  'servicesProvided',
  'salesChannels',
  'productSummary',
  'serviceInformation',
  'warrantyInformation',
  'logo',
  'youtube'
];

const filterModel = (model = {}) => {
  const payload = {};
  fields.forEach(key => payload[key] = getFiltered(model, key));
  return payload;
};

export default Component.extend(ActionMixin, {
  apollo: queryManager(),
  notify: inject(),
  session: inject(),

  model: null,
  name: null,
  email: null,
  error: null,

  isOpen: false,
  isInvalid: computed('name', 'email', function() {
    if (!this.name || !this.email) return true;
    return false;
  }),
  isSubmitDisabled: computed.or('isActionRunning', 'isInvalid'),

  actions: {
    async submit() {
      this.startAction();
      this.set('error', null);
      const { name, email } = this.getProperties('name', 'email');
      const { hash } = this.model;
      const payload = filterModel(this.model);
      const type = 'company';
      const variables = { input: { name, email, hash, type, payload } };

      try {
        await this.apollo.mutate({ mutation, variables, refetchQueries: ['CompanyUpdateContentHashQuery'] });
        if (!this.isDestroyed) this.set('isOpen', false);
        this.notify.info('Changes requested. You will recieve an email shortly confirming your request.', { clearDuration: 30000 });
        this.onComplete();
      } catch (e) {
        error(e);
        const err = getGraphqlError(e);
        this.set('error', err);
        this.notify.error(`Something went wrong -- please review your information and try again!`, { autoClear: false });
      } finally {
        this.endAction();
      }
    },

    clear() {
    },
  },

});
