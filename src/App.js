import React, { Component } from "react";
import Spinner from "react-spinkit";
import CardColorPicker from "./components/CardColorPicker";
import CenterTile from "./components/CenterTile";
import MainTitle from "./components/MainTitle";
import { Net, normalizer, normal, amplify } from "./brain";
import { compose, rgbaToString } from "./functional";
import { Button, Container, Column, Row, Text } from "./styled";

class App extends Component {
  state = {
    background: { r: 255, g: 255, b: 255, a: 1 },
    textColor: { r: 0, g: 0, b: 0, a: 1 },
    data: [],
    base: 5,
    brain: null,
    training: false,
    trained: false,
    error: 0,
    iterations: 0
  };

  handleBackgroundChangeComplete = color => {
    this.setState({ background: color.rgb, backgroundString: color.hex });
  };

  handleTextChangeComplete = color => {
    this.setState({ textColor: color.rgb, textColorString: color.hex });
  };

  addToData = () => {
    this.setState(prevState => {
      const { background, textColor, data, base } = prevState;
      return {
        data: data.concat({
          input: background,
          output: textColor
        }),
        base: data.length >= base ? data.length + 1 : base
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
    }).then(stats =>
      this.setState({
        brain: brain.toFunction(),
        trained: true,
        training: false,
        ...stats
      })
    );
  };

  test = () => {
    const { background, brain } = this.state;
    const result = compose(amplify, brain, normal)(background);
    this.setState({ textColor: result });
  };

  render() {
    const {
      background,
      textColor,
      data,
      base,
      trained,
      training,
      error,
      iterations
    } = this.state;
    const backgroundString = rgbaToString(background);
    const textColorString = rgbaToString(textColor);
    return (
      <Container background={backgroundString}>
        <MainTitle textColor={textColorString} title="Color Picker" />
        <Row direction="column">
          <CardColorPicker
            title="Background Color"
            handler={this.handleBackgroundChangeComplete}
            textColor={textColorString}
            picker={backgroundString}
          />
          {trained ? (
            <Column style={{ height: "120px" }} />
          ) : (
            <CardColorPicker
              title="Text Color"
              handler={this.handleTextChangeComplete}
              textColor={textColorString}
              picker={textColorString}
            />
          )}
          <CenterTile
            title={trained ? "Change Background!" : "Choose colors"}
            textColor={textColorString}
            count={data.length}
            base={base}
            trained={trained}
            handler={this.test}
          />
        </Row>
        <Row direction="column">
          <Column>
            {data.length < 5 ? (
              <Button onClick={this.addToData}>Add</Button>
            ) : (
              !training && (
                <Button onClick={trained ? this.test : this.train}>
                  {trained ? "Test" : "Train"}
                </Button>
              )
            )}
            <Button onClick={this.resetData}>Reset</Button>
          </Column>
        </Row>
        <Row direction="column">
          <Column
            style={{
              minHeight: "50px"
            }}
          >
            {training && <Spinner name="three-bounce" size={60} />}
          </Column>
        </Row>
        <Row direction="column">
          <Column>
            <Text color={textColorString}>Progress: {iterations} / 2000</Text>
          </Column>
          <Column style={{ marginTop: "20px", marginBottom: "100px" }}>
            <Text color={textColorString}>Error: {error.toFixed(2)} %</Text>
          </Column>
        </Row>
      </Container>
    );
  }
}

export default App;
