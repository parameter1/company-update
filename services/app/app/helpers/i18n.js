import translations from './translations';
import Helper from '@ember/component/helper';
import { inject } from '@ember/service';

export default Helper.extend({
  config: inject('config'),
  compute(fieldLabelKey) {
    let config = this.get('config');
    if (!translations[config.locale]) {
      throw new Error(`No translations available for requested language ${config.locale}!`);
    }
    if (!translations[config.locale][fieldLabelKey]) {
      throw new Error(`No translations available in ${config.locale} for requested key ${fieldLabelKey}!`);
    }
    return translations[config.locale][fieldLabelKey];
  }
});
