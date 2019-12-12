import { helper } from '@ember/component/helper';
import { get } from '@ember/object';

const getAsArray = (obj, path) => {
  const v = get(obj, path);
  return Array.isArray(v) ? v : [];
}

export function getEdgeNodes([obj, path]) {
  return getAsArray(obj, `${path}.edges`).map(edge => edge.node);
}

export default helper(getEdgeNodes);
