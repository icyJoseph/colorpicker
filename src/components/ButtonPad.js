import React from "react";
import { Button, Column, Row } from "../styled";

export const ButtonPad = ({ addDataHandler, trainHandler, resetHandler }) => (
  <Row>
    <Column>
      <Button onClick={trainHandler}>Train</Button>
    </Column>
    <Column>
      <Button onClick={addDataHandler}>Add</Button>
      <Button onClick={resetHandler}>Reset</Button>
    </Column>
  </Row>
);

export default ButtonPad;
