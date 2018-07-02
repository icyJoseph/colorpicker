import React from "react";
import { SketchPicker } from "react-color";

export const ColorPicker = ({ handler, color, style }) => {
  return <SketchPicker color={color} onChangeComplete={handler} />;
};

export default ColorPicker;
