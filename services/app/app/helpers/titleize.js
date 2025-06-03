import { helper } from '@ember/component/helper';

export function titleize([value]) {
  return value.match('_') ? value.split('_').map((word) => {
    const [firstLetter] = word;
    return word.replace(firstLetter, firstLetter.toUpperCase());
  }).join(' ') : value;
}

export default helper(titleize);
