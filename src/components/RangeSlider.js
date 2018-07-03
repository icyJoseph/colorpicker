import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Row } from "../styled";

export const RangeSlider = ({ ...props }) => (
  <Row style={{ marginTop: 10, height: 25 }}>
    <Slider {...props} />
  </Row>
);

export default RangeSlider;
