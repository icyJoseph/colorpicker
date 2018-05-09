import React from "react";
import { SketchPicker } from "react-color";

export const TestColorPicker = ({ color, handler }) => {
  return (
    <SketchPicker
      color={color}
      presetColors={[]}
      onChangeComplete={handler}
      style={{ height: "100px" }}
    />
  );
};

export default TestColorPicker;
