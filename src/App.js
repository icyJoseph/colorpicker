import React, { Component } from "react";
import Spinner from "react-spinkit";
import CardColorPicker from "./components/CardColorPicker";
import MainTitle from "./components/MainTitle";
import { Net, normalizer, rgbaToString } from "./brain";
import { Button, Container, Column, Row, Text } from "./styled";

class App extends Component {
  state = {
    data: [],
    temp: 0,
    color: { r: 0, g: 0, b: 0, a: 0 },
    base: 5,
    brain: null,
    training: false,
    trained: false,
    error: 0,
    iterations: 0
  };

  handleBackgroundChangeComplete = color => {
    console.log("handler", color);
    return this.setState({ color: color.rgb });
  };

  addToData = () => {
    this.setState(prevState => {
      const { temp, color, data, base } = prevState;
      console.log(color);
      return {
        data: data.concat({
          input: { temp },
          output: color
        }),
        base: data.length >= base ? data.length + 1 : base,
        temp: temp + 0.2
      };
    });
  };

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
    console.log("data", data);
    const normalized = data.map(normalizer);
    console.log(normalized);

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
    const { data, trained, training, error, color, iterations } = this.state;
    console.log("state", color, data);
    return (
      <Container>
        <MainTitle title="Color Picker" />
        <Row>
          <CardColorPicker
            title="Background Color"
            picker={rgbaToString(color)}
            handler={this.handleBackgroundChangeComplete}
            testMode={trained}
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
