import { NeuralNetwork } from "brain.js";

export default () => {
  const brain = new NeuralNetwork();
  return {
    brain,
    asyncTrain: (data, options) => brain.trainAsync(data, options)
  };
};
