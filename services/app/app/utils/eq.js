const { isArray } = Array;
const isObject = v => v != null && typeof v === 'object';

const eqObj = (first, second) => {
  const keys = Object.keys(first).filter(k => first[k]).filter(k => k !== '__typename');
  return keys.every(k => first[k] === second[k]);
};

const eqArr = (first, second) => {
  for (let i = 0; i < first.length; i++) {
    const fe = first[i];
    const se = second[i];
    if (isObject(fe)) {
      if (!(eqObj(fe, se) || eqObj(se, fe))) return false;
    } else if (fe !== se) {
      return false;
    }
  }
  return true;
};

export default (first, second = false) => {
  if (isObject(first) && !isArray(first)) return eqObj(first, second);
  if (!isArray(first) || !isArray(second)) return first == second;
  if (first.length !== second.length) return false;
  return eqArr(first, second) || eqArr(second, first);
};
