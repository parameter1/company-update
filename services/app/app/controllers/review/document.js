import Controller from '@ember/controller';
import { computed, get, set } from '@ember/object';
import { inject } from '@ember/service';

import ActionMixin from '@base-cms/company-update-app/mixins/action';
import discard from '@base-cms/company-update-app/gql/mutations/discard';
import documentUpload from '@base-cms/company-update-app/gql/mutations/document-upload';
import getGraphQlError from '@base-cms/company-update-app/utils/get-graphql-error';
import documentSection from '@base-cms/company-update-app/gql/queries/review/contact-section';
import documentCreate from '@base-cms/company-update-app/gql/mutations/review/document-create';
import documentUpdate from '@base-cms/company-update-app/gql/mutations/review/document-update';

const { error } = console;

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
   * Creates an AssetDocument and returns fileName and filePath for those to be set on the Document type uploaded
   * @param String url The URL to use as the upload source
   */
  async uploadDocumentFile (url) {
    if (!url) return false;
    const { createAssetDocumentFromUrl } = await this.apollo.mutate({ mutation: documentUpload, variables: { input: { url } }});
    return createAssetDocumentFromUrl;
  },

  /**
   * Creates document
   *
   * @param Number companyId The company ID
   * @param Object { ... } The document payload
   */
  async createDocument (companyId, { name, fileSrc, teaser }, primarySiteId) {
    const getDefaultSection = async () => {
      const variables = { siteId: primarySiteId };
      const { edges } = await this.apollo.query({ query: documentSection, variables, fetchPolicy: 'network-only' }, 'websiteSections');
      return get(edges, '0.node.id');
    };
    try {
      const { fileName, filePath } = await this.uploadDocumentFile(fileSrc) || {};
      const payload = {
        ...(fileName && { fileName }),
        ...(filePath && { filePath }),
        teaser,
        name,
        status: 1,
        primarySectionId: await getDefaultSection(),
        companyId,
      };
      const variables = { input: { payload } };
      await this.apollo.mutate({ mutation: documentCreate, variables }, 'createContentDocument');
    } catch (e) {
      error('Failed to upload document!', e.message);
    }
  },

  /**
   * Sets status:0 on document
   *
   * @param Number documentId
   */
  async deleteDocument (documentId) {
    const variables = { input: { id: documentId, payload: { status: 0 } } };
    return this.apollo.mutate({ mutation: documentUpdate, variables });
  },

  /**
   * Creates document, uploads/assigns primary image, and adds to company.
   *
   * @param Number contentId The company ID
   * @param Object { ... } The document payload
   */
  async updateDocument ({ id, teaser, fileSrc, labels, name }) {
    try {
      const { fileName, filePath } = await this.uploadDocumentFile(fileSrc);
      const payload = {
        teaser,
        ...(fileName && { fileName }),
        ...(filePath && { filePath }),
        ...(Array.isArray(labels) && { labels }),
        name,
      };
      const variables = { input: { id, payload } };
      await this.apollo.mutate({ mutation: documentUpdate, variables }, 'updateContentDocument');
    } catch (e) {
      error('Failed to upload document!', e.message);
    }
  },

  actions: {
    toggleField() {

    },
    toggleDocument() {

    },
    async publish() {
      this.startAction();
      set(this, 'isPublishing', true);
      try {
        const { id } = this.get('model.submission');
        const documents = this.get('documents');
        const contentId = this.get('model.company.id');
        const primarySiteId = this.get('model.company.primarySite.id');
        await Promise.all(documents.reduce((arr, obj) => {
          const { original, updated, payload } = obj;
          if (!payload.enabled) return arr;
          if (payload.added) return [...arr, this.createDocument(contentId, updated, primarySiteId)];
          if (payload.removed) return [...arr, this.deleteDocument(original.id)];
          const fields = Object.keys(obj.payload.fields).filter(k => obj.payload.fields[k] === true);
          const update = fields.reduce((o, f) => ({ ...o, [f]: obj.updated[f] }), { id: obj.original.id });
          return [...arr, this.updateDocument(update)];
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
