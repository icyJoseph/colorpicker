import React, { Component } from "react";

import ButtonPad from "./components/ButtonPad";
import CardColorPicker from "./components/CardColorPicker";
import Data from "./components/Data";
import MainTitle from "./components/MainTitle";
import Measure from "./components/Measure";
import PrintFn from "./components/PrintFn";
import RangeSlider from "./components/RangeSlider";

import Net from "./brain";
import { Container } from "./styled";
import { normalizer, rgbaToString, amplify } from "./helpers";
import { pipe } from "./functional";
import { initialState, options } from "./constants";

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
      temp: temp + 20 > 50 ? 50 : temp + 20
    }));

  train = () => {
    const { data } = this.state;
    if (data.length < 5) return null;
    this.setState({ training: true, trained: false });
    const { brain, asyncTrain } = Net();
    const normalized = data.map(normalizer);

    return asyncTrain(normalized, {
      ...options,
      callback: ({ error, iterations }) => this.setState({ error, iterations })
    }).then(stats =>
      this.setState({
        brain: brain.toFunction(),
        fn: brain.toFunction().toString(),
        trained: true,
        training: false,
        ...stats
      })
    );
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
        <div style={{ marginTop: 30 }}>
          <Measure measure="samples" value={`${data.length}/${base}`} />
          <Data data={data} />
          <PrintFn fn={fn} />
        </div>
      </Container>
    );
  }
}

export default App;
