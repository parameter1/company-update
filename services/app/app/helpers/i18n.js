import translations from './translations';
import { helper } from '@ember/component/helper';

export function i18n ([locale, fieldLabelKey]) {
  if (!translations[locale]) {
    throw new Error(`No translations available for requested language ${locale}!`);
  }
  if (!translations[locale][fieldLabelKey]) {
    throw new Error(`No translations available in ${locale} for requested key ${fieldLabelKey}!`);
  }
  return translations[locale][fieldLabelKey];
}

export default helper(i18n)
