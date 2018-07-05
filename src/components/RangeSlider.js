import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Column, Row } from "../styled";

export const RangeSlider = ({ ...props }) => (
  <Row style={{ height: 25 }}>
    <Column style={{ width: 300, margin: "auto" }}>
      <Slider {...props} />
    </Column>
  </Row>
);

export default RangeSlider;
