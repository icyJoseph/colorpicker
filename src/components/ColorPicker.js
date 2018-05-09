import React from "react";
import { GithubPicker } from "react-color";

export const ColorPicker = ({ handler, color, style }) => {
  return (
    <GithubPicker
      triangle="hide"
      width="400px"
      color={color}
      onChangeComplete={handler}
    />
  );
};

export default ColorPicker;
