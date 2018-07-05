import React from "react";
import { AlphaPicker, HuePicker } from "react-color";

export const ColorPicker = ({ handler, color, alpha }) => {
  return (
    <div style={{ width: "100%", height: "100px" }}>
      <div style={{ margin: "10px" }}>
        <HuePicker
          color={color}
          onChangeComplete={handler}
          style={{ margin: 10 }}
        />
      </div>
      <div style={{ margin: "10px" }}>
        <AlphaPicker
          color={color}
          onChangeComplete={alpha}
          style={{ margin: 10 }}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
