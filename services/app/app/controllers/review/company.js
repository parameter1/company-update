import Controller from '@ember/controller';
import { computed, get, set } from '@ember/object';
import { inject } from '@ember/service';
import gql from 'graphql-tag';
import getGraphQlError from '@base-cms/company-update-app/utils/get-graphql-error';
import ActionMixin from '@base-cms/company-update-app/mixins/action';
import imageUpload from '@base-cms/company-update-app/gql/mutations/image-upload';
import imageUpdate from '@base-cms/company-update-app/gql/mutations/image-update';
import complete from '@base-cms/company-update-app/gql/mutations/complete';
import discard from '@base-cms/company-update-app/gql/mutations/discard';
import eq from '@base-cms/company-update-app/utils/eq';

const buildMutation = (payload = {}) => {
  return gql`
  mutation CompanyUpdatePublish(
    ${payload.logo ? '$images: UpdateContentCompanyImagesMutationInput!,' : ''}
    ${payload.externalLinks ? '$externalLinks: UpdateContentCompanyExternalLinksMutationInput!,' : ''}
    ${payload.socialLinks ? '$social: UpdateContentCompanySocialLinksMutationInput!,' : ''}
    ${payload.youtube ? '$youtube: UpdateContentCompanyYoutubeMutationInput!,' : ''}
    ${payload.customAttributes ? '$customAttributes: UpdateContentCompanyCustomAttributesMutationInput!,' : ''}
    $company: UpdateContentCompanyMutationInput!
  ) {
    ${payload.logo ? 'updateContentCompanyImages(input: $images) { id }' : ''}
    ${payload.externalLinks ? 'updateContentCompanyExternalLinks(input: $externalLinks) { id }' : ''}
    ${payload.socialLinks ? 'updateContentCompanySocialLinks(input: $social) { id }' : ''}
    ${payload.youtube ? 'updateContentCompanyYoutube(input: $youtube) { id }' : ''}
    ${payload.customAttributes ? 'updateContentCompanyCustomAttributes(input: $customAttributes) { id }' : ''}
    updateContentCompany(input: $company) { id }
  }
  `;
};

export default Controller.extend(ActionMixin, {
  apollo: inject(),
  config: inject(),
  notify: inject(),
  disabled: computed.reads('isActionRunning'),
  isPublishing: false,
  isDiscarding: false,

  companyServicesFieldsEnabled: computed.reads('config.companyServicesFieldsEnabled'),

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

        const {
          logo,
          externalLinks,
          socialLinks,
          youtube,
          customAttributes: attrs,
          ...company
        } = input;

        const customAttributes = Object.keys(attrs || {}).reduce((arr, k) => ([
          ...arr,
          { key: k, value: get(attrs, k) }
        ]), []);

        const image = await this.handleImage(logo);
        const variables = {
          company: { id, payload: company },
          ...(externalLinks && { externalLinks: { id, payload: { externalLinks } } }),
          ...(socialLinks && { social: { id, payload: { socialLinks } } }),
          ...(youtube && { youtube: { id, payload: { ...youtube } } }),
          ...(image && { images: { id, payload: { primaryImage: image.primaryImage, images: image.images } } }),
          ...(customAttributes && { customAttributes: { id, payload: customAttributes } })
        };

        await this.apollo.mutate({ mutation: buildMutation(input), variables });
        await this.apollo.mutate({ mutation: complete, variables: { id: get(this, 'model.submission.id') }, refetchQueries: ['ContentUpdateListSubmissions'] });
        set(this, 'model.submission.reviewed', true);
        this.notify.success('Changes have been published!');
        this.transitionToRoute('list');
      } catch (e) {
        this.notify.error(getGraphQlError(e), { autoClear: false });
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
        this.notify.error(getGraphQlError(e), { autoClear: false });
      } finally {
        set(this, 'isDiscarding', false);
        this.endAction();
      }
    },
  },
});
