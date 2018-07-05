import React from "react";
import { Column, Row, RGBColor } from "../styled";

export const RGB = ({ rgb }) => {
  const colors = Object.keys(rgb);
  return (
    <Row style={{ marginTop: 10 }}>
      <Column>
        {colors.map((color, index) => (
          <RGBColor key={`${color}-${index}`}>
            {color}:{" "}
            {rgb[color] < 1 ? rgb[color].toFixed(2) : rgb[color].toFixed(0)}
          </RGBColor>
        ))}
      </Column>
    </Row>
  );
};

export default RGB;
