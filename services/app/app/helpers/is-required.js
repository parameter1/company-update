import Helper from '@ember/component/helper';
import { inject } from '@ember/service';

export default Helper.extend({
  config: inject('config'),
  compute([fieldKey]) {
    const config = this.get('config');
    const { requiredCompanyFields } = config;
    return requiredCompanyFields.includes(fieldKey);
  }
});
