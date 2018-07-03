import React from "react";
import { Button, Column, Row } from "../styled";

export const ButtonPad = ({
  data,
  trained,
  training,
  addDataHandler,
  trainHandler,
  resetHandler
}) => (
  <Row>
    <Column>
      {trained ? null : data.length < 5 ? (
        <Button onClick={addDataHandler}>Add</Button>
      ) : (
        !training && <Button onClick={trainHandler}>Train</Button>
      )}
      <Button onClick={resetHandler}>Reset</Button>
    </Column>
  </Row>
);

export default ButtonPad;
