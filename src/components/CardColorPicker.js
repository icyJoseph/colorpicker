import React from "react";
import ColorPicker from "./ColorPicker";
import Loader from "./Loader";
import Stats from "./Stats";
import { Row, Column, Heading, ColorPad } from "../styled";

export const CardColorPicker = ({
  title,
  picker,
  handler,
  alpha,
  trained,
  training,
  iterations,
  totalIterations,
  error
}) => (
  <Row style={{ margin: 35 }}>
    <Column style={{ marginBottom: 10 }}>
      <Heading size={16}>{title}</Heading>
    </Column>
    <Column style={{ marginBottom: 10 }}>
      {training ? <Loader /> : <ColorPad background={picker} />}
    </Column>
    {!training && !trained ? (
      <ColorPicker color={picker} handler={handler} alpha={alpha} />
    ) : (
      <Stats
        iterations={iterations}
        totalIterations={totalIterations}
        error={error}
      />
    )}
  </Row>
);

export default CardColorPicker;
