import { helper } from '@ember/component/helper';

export function modelValue([ model, key ]) {
  return model[key];
}

export default helper(modelValue);
