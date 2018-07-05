import React from "react";
import { Column, Row } from "../styled";
import Measure from "./Measure";

export const Stats = ({ iterations, totalIterations, error }) => (
  <Row style={{ height: "100px" }}>
    <Column>
      <Measure measure="progress" value={`${iterations}/${totalIterations}`} />
    </Column>
    <Column>
      <Measure measure="error" value={`${error.toFixed(2)}`} unit="%" />
    </Column>
  </Row>
);

export default Stats;
