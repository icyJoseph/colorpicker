import React, { Component } from "react";

import ButtonPad from "./components/ButtonPad";
import CardColorPicker from "./components/CardColorPicker";
import MainTitle from "./components/MainTitle";
import Measure from "./components/Measure";

import Loader from "./components/Loader";
import RangeSlider from "./components/RangeSlider";
import Stats from "./components/Stats";

import { Net, normalizer, rgbaToString } from "./brain";

import { Container } from "./styled";

const initialState = {
  data: [],
  temp: -50,
  color: { r: 0, g: 0, b: 0, a: 1 },
  base: 5,
  brain: null,
  training: false,
  trained: false,
  error: 0,
  iterations: 0
};

class App extends Component {
  state = {
    ...initialState
  };

  colorPickerChange = ({ rgb }) => this.setState({ color: rgb });

  sliderChange = temp => this.setState({ temp });

  resetData = () => this.setState({ ...initialState });

  addToData = () =>
    this.setState(prevState => {
      const { temp, color, data, base } = prevState;
      return {
        data: data.concat({
          input: { temp },
          output: color
        }),
        base: data.length >= base ? data.length + 1 : base
      };
    });

  train = () => {
    this.setState({ training: true, trained: false });
    const { brain, asyncTrain } = Net();
    const { data } = this.state;
    const normalized = data.map(normalizer);

    return asyncTrain(normalized, {
      iterations: 2000,
      errorThresh: 0.005,
      log: false,
      logPeriod: 10,
      learningRate: 0.3,
      momentum: 0.1,
      callback: ({ error, iterations }) => this.setState({ error, iterations }),
      callbackPeriod: 75,
      timeout: Infinity
    })
      .then(stats =>
        this.setState({
          brain: brain.toFunction(),
          trained: true,
          training: false,
          ...stats
        })
      )
      .then(() => console.log(brain.toFunction().toString()));
  };

  render() {
    const {
      data,
      trained,
      training,
      error,
      color,
      iterations,
      temp
    } = this.state;

    return (
      <Container>
        <MainTitle
          color={"black"}
          title="Temperature to Color"
          subtitle="with Machine Learning"
        />
        <CardColorPicker
          title="Select a temperature color"
          picker={rgbaToString(color)}
          handler={this.colorPickerChange}
          testMode={trained}
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
        {training && <Loader />}
        <Stats iterations={iterations} error={error} />
      </Container>
    );
  }
}

export default App;
