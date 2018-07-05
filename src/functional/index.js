export const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data);

export const pipe = (...functions) => data =>
  functions.reduce((value, func) => func(value), data);

export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const curry = f => (...a) => (...b) => f(...a, ...b);

export const curryRight = f => (...b) => (...a) => f(...a, ...b);

export const replaceAll = (str, find, replace) => {
  return str.replace(new RegExp(find, "g"), replace);
};

export const replace = (str, find, replace) => str.replace(find, replace);
