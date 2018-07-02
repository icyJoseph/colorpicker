import { NeuralNetwork } from "brain.js";

export const Net = () => {
  const brain = new NeuralNetwork();
  return {
    brain,
    asyncTrain: (data, options) => brain.trainAsync(data, options)
  };
};

export const normalizer = ({ input, output }) => {
  return { input, output: normal(output) };
};

export const normal = ({ r, g, b, a }) => {
  return { r: r / 255, g: g / 255, b: b / 255, a };
};

export const amplify = ({ r, g, b, a }) => {
  return { r: 255 * r, g: g * 255, b: b * 255, a };
};

export const rgbaToString = ({ r, g, b, a }) => {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
