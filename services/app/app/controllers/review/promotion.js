import Controller from '@ember/controller';
import { computed, get, set } from '@ember/object';
import { inject } from '@ember/service';

import ActionMixin from '@base-cms/company-update-app/mixins/action';
import discard from '@base-cms/company-update-app/gql/mutations/discard';
import imageUpload from '@base-cms/company-update-app/gql/mutations/image-upload';
import getGraphQlError from '@base-cms/company-update-app/utils/get-graphql-error';
import promotionSection from '@base-cms/company-update-app/gql/queries/review/contact-section';
import promotionCreate from '@base-cms/company-update-app/gql/mutations/review/promotion-create';
import promotionUpdate from '@base-cms/company-update-app/gql/mutations/review/promotion-update';
import promotionImages from '@base-cms/company-update-app/gql/mutations/review/promotion-images';

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

  payload: null,

  /**
   * Creates an AssetImage and sets as primary image on promotion
   *
   * @param Object { src } The image to upload
   * @param Number promotionId The promotion ID
   */
  async uploadPromotionImage (primaryImage, promotionId) {
    if (!primaryImage) return false;
    const { src } = primaryImage;
    const uploadVars = { input: { url: src } };
    const { id } = await this.apollo.mutate({ mutation: imageUpload, variables: uploadVars }, 'createAssetImageFromUrl');

    const payload = { primaryImageId: id, imageIds: [id] };
    const updateVars = { input: { id: promotionId, payload } };
    return this.apollo.mutate({ mutation: promotionImages, variables: updateVars });
  },

  /**
   * Creates promotion, uploads/assigns primary image, and adds to company.
   *
   * @param Number contentId The company ID
   * @param Object { ... } The promotion payload
   */
  async createPromotion (contentId, promotionIds, { linkUrl, linkText, name, primaryImage }) {
    const getDefaultSection = async () => {
      const { edges } = await this.apollo.query({ query: promotionSection }, 'websiteSections');
      return get(edges, '0.node.id');
    };
    const primarySectionId = await getDefaultSection();
    const payload = { linkUrl, linkText, name, status: 1, primarySectionId, companyId: contentId };
    const variables = { input: { payload } };
    const { id: promotionId } = await this.apollo.mutate({ mutation: promotionCreate, variables }, 'createContentPromotion');
    await this.uploadPromotionImage(primaryImage, promotionId);
  },

  /**
   * Sets status:0 on promotion and removes from company.
   *
   * @param Number contentId The company ID
   * @param Object { id } The promotion to remove
   */
  async deletePromotion (contentId, promotionIds, { id }) {
    const variables = { input: { id, payload: { status: 0 } } };
    await this.apollo.mutate({ mutation: promotionUpdate, variables });
  },

  /**
   * Creates promotion, uploads/assigns primary image, and adds to company.
   *
   * @param Number contentId The company ID
   * @param Object { ... } The promotion payload
   */
  async updatePromotion ({ id, linkUrl, linkText, name, primaryImage }) {
    const payload = { linkUrl, linkText, name };
    const variables = { input: { id, payload } };
    await this.apollo.mutate({ mutation: promotionUpdate, variables }, 'updateContentPromotion');
    return this.uploadPromotionImage(primaryImage, id);
  },

  actions: {
    toggleField() {

    },
    togglePromotion() {

    },
    async publish() {
      this.startAction();
      set(this, 'isPublishing', true);
      try {
        const { id } = this.get('model.submission');
        const promotions = this.get('model.promotions');
        const contentId = this.get('model.company.id');
        const promotionIds = this.get('model.company.promotions.edges').map(({ node }) => node.id);

        await Promise.all(promotions.reduce((arr, obj) => {
          const { original, updated, payload } = obj;
          if (!payload.enabled) return arr;
          if (payload.added) return [...arr, this.createPromotion(contentId, promotionIds, updated)];
          if (payload.removed) return [...arr, this.deletePromotion(contentId, promotionIds, original)];
          const fields = Object.keys(obj.payload.fields).filter(k => obj.payload.fields[k] === true);
          const update = fields.reduce((o, f) => ({ ...o, [f]: obj.updated[f] }), { id: obj.original.id });
          return [...arr, this.updatePromotion(update)];
        }, []));

        set(this, 'model.submission.reviewed', true);
        await this.apollo.mutate({ mutation: discard, variables: { id }, refetchQueries: ['ContentUpdateListSubmissions'] });
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
        await this.apollo.mutate({ mutation: discard, variables: { id: get(this, 'model.submission.id') } });
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
