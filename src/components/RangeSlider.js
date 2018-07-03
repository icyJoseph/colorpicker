import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export const RangeSlider = ({ ...props }) => (
  <div>
    <Slider {...props} />
  </div>
);

export default RangeSlider;
