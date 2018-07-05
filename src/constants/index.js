export const initialState = {
  data: [],
  temp: -50,
  color: { r: 64, g: 124, b: 191, a: 1 },
  base: 5,
  brain: null,
  training: false,
  trained: false,
  error: 0,
  iterations: 0,
  fn: ""
};

export const options = {
  iterations: 2000,
  errorThresh: 0.005,
  log: false,
  logPeriod: 10,
  learningRate: 0.3,
  momentum: 0.1,
  callbackPeriod: 75,
  timeout: Infinity
};

export const anon = "anonymous";
export const name = "mapColorToTemp";
export const input = "input";
export const temp = "temp";

export const inputTemp = /input\['temp'\]/;
export const formula = "(temp + 50)/100";

export const scale = /:1/;
export const realScale = ":255";
