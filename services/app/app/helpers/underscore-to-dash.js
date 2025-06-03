import { helper } from '@ember/component/helper';

export function underscoreToDash([value]) {
  return value.replace(/_/g, '-');
}

export default helper(underscoreToDash);
