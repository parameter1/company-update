import translations from './translations';
import Helper from '@ember/component/helper';
import { inject } from '@ember/service';

const { warn } = console

export default Helper.extend({
  config: inject('config'),
  compute([fieldLabelKey, defaultValue]) {
    const config = this.get('config');
    if (!translations[config.locale]) {
      throw new Error(`No translations available for requested language ${config.locale}!`);
    }
    if (!translations[config.locale][fieldLabelKey]) {
      if (defaultValue) {
        warn(`Missing ${config.locale} translation for ${fieldLabelKey}, using default value`);
        return defaultValue;
      }
      throw new Error(`No translations available in ${config.locale} for requested key ${fieldLabelKey}!`);
    }
    return translations[config.locale][fieldLabelKey];
  }
});
