export const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data);

export const pipe = (...functions) => data =>
  functions.reduce((value, func) => func(value), data);

export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1);
