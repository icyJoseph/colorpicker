import React, { Component } from "react";

import ButtonPad from "./components/ButtonPad";
import CardColorPicker from "./components/CardColorPicker";
import MainTitle from "./components/MainTitle";
import Measure from "./components/Measure";
import RangeSlider from "./components/RangeSlider";

import { Net, normalizer, rgbaToString, amplify, printFunction } from "./brain";

import { Row, Container } from "./styled";
import { pipe } from "./functional";

const initialState = {
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

const options = {
  iterations: 2000,
  errorThresh: 0.005,
  log: false,
  logPeriod: 10,
  learningRate: 0.3,
  momentum: 0.1,
  callbackPeriod: 75,
  timeout: Infinity
};

class App extends Component {
  state = {
    ...initialState
  };

  colorPickerChange = ({ rgb: { r, g, b } }) =>
    this.setState(({ color }) => ({
      color: { ...color, r, g, b }
    }));

  alphaPickerChange = ({ rgb: { a } }) =>
    this.setState(({ color }) => ({ color: { ...color, a } }));

  sliderChange = temp =>
    this.setState(prevState => {
      return {
        ...prevState,
        color: prevState.trained
          ? pipe(
              ({ temp }) => ({ temp: (temp + 50) / 100 }),
              prevState.brain,
              amplify
            )({ temp })
          : prevState.color,
        temp
      };
    });

  resetData = () => this.setState({ ...initialState });

  addToData = () =>
    this.setState(({ temp, color, data, base }) => ({
      data: data.concat({
        input: { temp },
        output: color
      }),
      base: data.length >= base ? data.length + 1 : base,
      temp: temp + 20
    }));

  train = () => {
    this.setState({ training: true, trained: false });
    const { brain, asyncTrain } = Net();
    const { data } = this.state;
    const normalized = data.map(normalizer);

    return asyncTrain(normalized, {
      ...options,
      callback: ({ error, iterations }) => this.setState({ error, iterations })
    })
      .then(stats =>
        this.setState({
          brain: brain.toFunction(),
          fn: brain.toFunction().toString(),
          trained: true,
          training: false,
          ...stats
        })
      )
      .then(() => console.log(brain.toFunction().toString()));
  };

  render() {
    const {
      base,
      data,
      trained,
      training,
      error,
      color,
      iterations,
      temp,
      fn
    } = this.state;

    return (
      <Container>
        <MainTitle
          color={"black"}
          title="Map Temperature to Color"
          subtitle="with Machine Learning"
        />
        <CardColorPicker
          title="Select a temperature color"
          picker={rgbaToString(color)}
          handler={this.colorPickerChange}
          alpha={this.alphaPickerChange}
          trained={trained}
          training={training}
          iterations={iterations}
          totalIterations={options.iterations}
          error={error}
        />
        <Measure measure="temperature" value={temp} unit="&deg;C" />
        <RangeSlider
          key="slider"
          min={-50}
          max={50}
          value={temp}
          onChange={this.sliderChange}
        />
        <ButtonPad
          data={data}
          trained={trained}
          training={training}
          addDataHandler={this.addToData}
          trainHandler={this.train}
          resetHandler={this.resetData}
        />
        {!trained && (
          <Measure measure="data" value={`${data.length}/${base}`} />
        )}
        {data.map(({ input, output }, index) => (
          <div
            key={`${index}-${input.temp}`}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: 10
            }}
          >
            <code>
              Data[{index}]: {`${"{"}`} temperature:{input.temp}, color:{" "}
            </code>
            <div
              style={{
                borderRadius: "50%",
                height: 16,
                width: 16,
                background: rgbaToString(output)
              }}
            />
            <code>{`${"}"}`}</code>
          </div>
        ))}
        <Row style={{ width: 300, margin: 10 }}>
          {fn && (
            <div>
              <div>Your function is:</div>
              <div>
                <code>{printFunction(fn)}</code>
              </div>
            </div>
          )}
        </Row>
      </Container>
    );
  }
}

export default App;
