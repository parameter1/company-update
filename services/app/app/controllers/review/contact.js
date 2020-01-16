import Controller from '@ember/controller';
import { computed, get, set } from '@ember/object';
import { inject } from '@ember/service';

import ActionMixin from '@base-cms/company-update-app/mixins/action';
import discard from '@base-cms/company-update-app/gql/mutations/discard';
import imageUpload from '@base-cms/company-update-app/gql/mutations/image-upload';
import getGraphQlError from '@base-cms/company-update-app/utils/get-graphql-error';
import contactSection from '@base-cms/company-update-app/gql/queries/review/contact-section';
import contactCreate from '@base-cms/company-update-app/gql/mutations/review/contact-create';
import contactUpdate from '@base-cms/company-update-app/gql/mutations/review/contact-update';
import contactImages from '@base-cms/company-update-app/gql/mutations/review/contact-images';
import companyContacts from '@base-cms/company-update-app/gql/mutations/review/contact-company-contacts';

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
   * Creates an AssetImage and sets as primary image on contact
   *
   * @param Object { src } The image to upload
   * @param Number contactId The contact ID
   */
  async uploadContactImage (primaryImage, contactId) {
    if (!primaryImage) return false;
    const { src } = primaryImage;
    const uploadVars = { input: { url: src } };
    const { id } = await this.apollo.mutate({ mutation: imageUpload, variables: uploadVars }, 'createAssetImageFromUrl');

    const payload = { primaryImageId: id, imageIds: [id] };
    const updateVars = { input: { id: contactId, payload } };
    return this.apollo.mutate({ mutation: contactImages, variables: updateVars });
  },

  /**
   * Creates contact, uploads/assigns primary image, and adds to company.
   *
   * @param Number contentId The company ID
   * @param Object { ... } The contact payload
   */
  async createContact (contentId, contactIds, { firstName, lastName, title, primaryImage }) {
    const getDefaultSection = async () => {
      const { edges } = await this.apollo.query({ query: contactSection }, 'websiteSections');
      return get(edges, '0.node.id');
    };
    const primarySectionId = await getDefaultSection();
    const payload = { firstName, lastName, title, status: 1, primarySectionId };
    const variables = { input: { payload } };
    const { id: contactId } = await this.apollo.mutate({ mutation: contactCreate, variables }, 'createContentContact');
    await this.uploadContactImage(primaryImage, contactId);

    const ids = [contactId, ...contactIds];
    const updateVars = { input: { id: contentId, payload: { contactIds: ids } } };
    return this.apollo.mutate({ mutation: companyContacts, variables: updateVars });
  },

  /**
   * Sets status:0 on contact and removes from company.
   *
   * @param Number contentId The company ID
   * @param Object { id } The contact to remove
   */
  async deleteContact (contentId, contactIds, { id }) {
    const variables = { input: { id, payload: { status: 0 } } };
    await this.apollo.mutate({ mutation: contactUpdate, variables });
    const ids = contactIds.filter(v => v !== id);
    const updateVars = { input: { id: contentId, payload: { contactIds: ids } } };
    return this.apollo.mutate({ mutation: companyContacts, variables: updateVars });
  },

  /**
   * Creates contact, uploads/assigns primary image, and adds to company.
   *
   * @param Number contentId The company ID
   * @param Object { ... } The contact payload
   */
  async updateContact ({ id, firstName, lastName, title, primaryImage }) {
    const payload = { firstName, lastName, title };
    const variables = { input: { id, payload } };
    await this.apollo.mutate({ mutation: contactUpdate, variables }, 'updateContentContact');
    return this.uploadContactImage(primaryImage, id);
  },

  actions: {
    toggleField() {

    },
    toggleContact() {

    },
    async publish() {
      this.startAction();
      set(this, 'isPublishing', true);
      try {
        const { id } = this.get('model.submission');
        const contacts = this.get('model.contacts');
        const contentId = this.get('model.company.id');
        const contactIds = this.get('model.company.publicContacts.edges').map(({ node }) => node.id);

        await Promise.all(contacts.reduce((arr, obj) => {
          const { original, updated, payload } = obj;
          if (!payload.enabled) return arr;
          if (payload.added) return [...arr, this.createContact(contentId, contactIds, updated)];
          if (payload.removed) return [...arr, this.deleteContact(contentId, contactIds, original)];
          const fields = Object.keys(obj.payload.fields).filter(k => obj.payload.fields[k] === true);
          const update = fields.reduce((o, f) => ({ ...o, [f]: obj.updated[f] }), { id: obj.original.id });
          return [...arr, this.updateContact(update)];
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
