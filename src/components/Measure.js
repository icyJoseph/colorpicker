import React from "react";
import { capitalize } from "../functional";
import { Text } from "../styled";

export const Measure = ({ measure, value, unit = "" }) => (
  <Text>
    {capitalize(measure)}: {value} <span>{`${unit}`}</span>
  </Text>
);

export default Measure;
