import React from "react";
import { Column, Row, Text } from "../styled";

export const Stats = ({ iterations, error }) => (
  <Row>
    <Column>
      <Text>Progress: {iterations} / 2000</Text>
    </Column>
    <Column>
      <Text>Error: {error.toFixed(2)} %</Text>
    </Column>
  </Row>
);

export default Stats;
