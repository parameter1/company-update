import { helper } from '@ember/component/helper';

export function eq([test, value]) {
  return test == value;
}

export default helper(eq);
