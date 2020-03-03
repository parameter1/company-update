import { helper } from '@ember/component/helper';

export function bind([fn, context]) {
  return fn.bind(context);
}

export default helper(bind);
