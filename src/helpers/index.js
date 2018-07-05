import { pipe, curryRight, replace, replaceAll } from "../functional";
import {
  anon,
  name,
  inputTemp,
  formula,
  input,
  temp,
  scale,
  realScale
} from "../constants";

/* helpers */
export const normalizer = ({ input, output }) => {
  return { input: normalTemp(input), output: normal(output) };
};

export const normalTemp = ({ temp }) => ({ temp: (temp + 50) / 100 });

export const normal = ({ r, g, b, a }) => {
  return { r: r / 255, g: g / 255, b: b / 255, a };
};

export const amplify = ({ r, g, b, a }) => {
  return { r: 255 * r, g: g * 255, b: b * 255, a };
};

export const rgbaToString = ({ r, g, b, a }) => {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export const printFunction = pipe(
  curryRight(replace)(anon, name),
  curryRight(replaceAll)(inputTemp, formula),
  curryRight(replace)(input, temp),
  curryRight(replace)(scale, realScale), // for r
  curryRight(replace)(scale, realScale), // for g
  curryRight(replace)(scale, realScale) // for b, and not for a
);
