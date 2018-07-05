import { NeuralNetwork } from "brain.js";
import { pipe, curryRight } from "../functional";

export const Net = () => {
  const brain = new NeuralNetwork();
  return {
    brain,
    asyncTrain: (data, options) => brain.trainAsync(data, options)
  };
};

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

export const replaceAll = (str, find, replace) => {
  return str.replace(new RegExp(find, "g"), replace);
};

export const replace = (str, find, replace) => str.replace(find, replace);

export const anon = "anonymous";
export const name = "mapColorToTemp";
export const input = "input";
export const temp = "temp";

export const inputTemp = /input\['temp'\]/;
export const formula = "(temp + 50)/100";

export const scale = /:1/;
export const realScale = ":255";

export const printFunction = pipe(
  curryRight(replace)(anon, name),
  curryRight(replaceAll)(inputTemp, formula),
  curryRight(replace)(input, temp),
  curryRight(replaceAll)(scale, realScale)
);
