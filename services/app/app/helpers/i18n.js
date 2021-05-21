import translations from './translations';
import { helper } from '@ember/component/helper';

export function i18n ([lang, fieldLabelKey]) {
  console.log(lang)
  if (!translations[lang]) {
    throw new Error(`No translations available for requested language ${lang}!`);
  }
  if (!translations[lang][fieldLabelKey]) {
    throw new Error(`No translations available in ${lang} for requested key ${fieldLabelKey}!`);
  }
  return translations[lang][fieldLabelKey];
}

export default helper(i18n)
