import { helper } from '@ember/component/helper';

export function getSectionClass([id, current = [], old = []]) {
  if (current.includes(id) && !old.includes(id)) return 'text-success';
  if (old.includes(id) && !current.includes(id)) return 'text-danger';
  return 'text-muted';
}

export default helper(getSectionClass);
