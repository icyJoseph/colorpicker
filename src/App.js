import React, { Component } from "react";
import Spinner from "react-spinkit";
import CardColorPicker from "./components/CardColorPicker";
import MainTitle from "./components/MainTitle";
import RangeSlider from "./components/RangeSlider";
import { Net, normalizer, rgbaToString } from "./brain";
import { Button, Container, Column, Row, Text } from "./styled";

class App extends Component {
  state = {
    data: [],
    temp: -50,
    color: { r: 0, g: 0, b: 0, a: 0 },
    base: 5,
    brain: null,
    training: false,
    trained: false,
    error: 0,
    iterations: 0
  };

  colorPickerChange = color => this.setState({ color: color.rgb });

  sliderChange = temp => this.setState({ temp });

  addToData = () =>
    this.setState(prevState => {
      const { temp, color, data, base } = prevState;
      console.log(color);
      return {
        data: data.concat({
          input: { temp: (temp + 50) / 100 },
          output: color
        }),
        base: data.length >= base ? data.length + 1 : base,
        temp: temp + 0.2
      };
    });

  resetData = () => {
    this.setState({
      data: [],
      base: 5,
      brain: null,
      trained: false,
      training: false,
      background: { r: 255, g: 255, b: 255, a: 1 },
      textColor: { r: 0, g: 0, b: 0, a: 1 },
      iterations: 0,
      error: 0
    });
  };

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
        <MainTitle title="Temperature to Color" />
        <Row>
          <CardColorPicker
            title="Background Color"
            picker={rgbaToString(color)}
            handler={this.colorPickerChange}
            testMode={trained}
          />
        </Row>
        <Row>
          <RangeSlider
            key="slider"
            min={-50}
            max={50}
            value={temp}
            onChange={this.sliderChange}
            style={{ marginTop: 50, height: 50 }}
          />
        </Row>
        <Row>
          <Column>
            {trained ? null : data.length < 5 ? (
              <Button onClick={this.addToData}>Add</Button>
            ) : (
              !training && <Button onClick={this.train}>Train</Button>
            )}

            <Button onClick={this.resetData}>Reset</Button>
          </Column>
        </Row>
        <Row>
          <Column>
            {training && <Spinner name="three-bounce" size={60} />}
          </Column>
        </Row>
        <Row>
          <Column>
            <Text>Progress: {iterations} / 2000</Text>
          </Column>
          <Column>
            <Text>Error: {error.toFixed(2)} %</Text>
          </Column>
        </Row>
      </Container>
    );
  }
}

export default App;
