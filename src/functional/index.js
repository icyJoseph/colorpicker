export const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data);

export const pipe = (...functions) => data =>
  functions.reduce((value, func) => func(value), data);

export const rgbaToString = ({ r, g, b, a }) => {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
