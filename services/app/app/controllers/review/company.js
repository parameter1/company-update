import Controller from '@ember/controller';
import { computed, get, set } from '@ember/object';
import { inject } from '@ember/service';
import gql from 'graphql-tag';

import ActionMixin from '../../mixins/action';
import imageUpload from '../../gql/mutations/image-upload';
import imageUpdate from '../../gql/mutations/image-update';
import complete from '../../gql/mutations/complete';
import discard from '../../gql/mutations/discard';
import eq from '../../utils/eq';

const buildMutation = (payload = {}) => {
  return gql`
  mutation CompanyUpdatePublish(
    ${payload.logo ? '$images: UpdateContentCompanyImagesMutationInput!,' : ''}
    ${payload.socialLinks ? '$social: UpdateContentCompanySocialLinksMutationInput!,' : ''}
    $company: UpdateContentCompanyMutationInput!
  ) {
    ${payload.logo ? 'updateContentCompanyImages(input: $images) { id }' : ''}
    ${payload.socialLinks ? 'updateContentCompanySocialLinks(input: $social) { id }' : ''}
    updateContentCompany(input: $company) { id }
  }
  `;
};

export default Controller.extend(ActionMixin, {
  apollo: inject(),
  notify: inject(),
  disabled: computed.reads('isActionRunning'),
  isPublishing: false,
  isDiscarding: false,

  isDisabled: computed('isActionRunning', 'model.submission.reviewed', function() {
    if (this.get('model.submission.reviewed')) return true;
    return this.get('isActionRunning');
  }),

  payload: computed('model.submission.payload', function() {
    const payload = this.get('model.submission.payload') || {};
    const company = this.get('model.company');
    return Object.keys(payload).reduce((obj, k) => {
      const pv = get(payload, k);
      const cv = get(company, k);
      return eq(pv, cv) ? obj : { ...obj, [k]: true };
    }, {});
  }),

  async handleImage(logo) {
    if (!logo) return false;
    const uploadVars = { input: { url: logo } };
    const { id } = await this.apollo.mutate({ mutation: imageUpload, variables: uploadVars }, 'createAssetImageFromUrl');
    const updateVars = { input: { id, payload: { isLogo: true } } };
    await this.apollo.mutate({ mutation: imageUpdate, variables: updateVars }, 'updateAssetImage');
    const images = (get(this, 'model.company.images.edges') || []).map(({ node }) => node.id);
    return {
      primaryImage: id,
      images: [...images, id]
    };
  },

  actions: {
    toggleField(key) {
      const v = Boolean(this.get(`payload.${key}`));
      set(this, `payload.${key}`, !v);
    },
    async publish() {
      this.startAction();
      set(this, 'isPublishing', true);
      try {
        const id = get(this, 'model.company.id');
        const payload = this.get('payload');
        const keys = Object.keys(payload || {});
        const input = keys.reduce((obj, k) => {
          const include = Boolean(get(payload, k));
          const v = get(this, `model.submission.payload.${k}`);
          return include ? { ...obj, [k]: v } : obj;
        }, {});

        const { logo, socialLinks, ...company } = input;

        const image = await this.handleImage(logo);
        const variables = {
          company: { id, payload: company },
          ...(socialLinks && { social: { id, payload: { socialLinks } } }),
          ...(image && { images: { id, payload: { primaryImage: image.primaryImage, images: image.images } } }),
        };

        await this.apollo.mutate({ mutation: buildMutation(input), variables });
        await this.apollo.mutate({ mutation: complete, variables: { id: get(this, 'model.submission.id') } });
        set(this, 'model.submission.reviewed', true);
        this.notify.success('Changes have been published!');
        this.transitionToRoute('list');
      } catch (e) {
        const msg = get(e, 'errors.0.message');
        this.notify.error(msg || 'Unable to submit', { autoClear: false });
      } finally {
        set(this, 'isPublishing', false);
        this.endAction();
      }
    },
    async discard() {
      this.startAction()
      set(this, 'isDiscarding', true);
      try {
        await this.apollo.mutate({ mutation: discard, variables: { id: get(this, 'model.submission.id') }, refetchQueries: ['ContentUpdateListSubmissions'] });
        this.notify.warning('Changes have been discarded!');
        this.transitionToRoute('list');
        set(this, 'model.submission.reviewed', true);
      } catch (e) {
        const msg = get(e, 'errors.0.message');
        this.notify.error(msg || 'Unable to discard', { autoClear: false });
      } finally {
        set(this, 'isDiscarding', false);
        this.endAction();
      }
    },
  },
});
