import React from "react";
import ColorPicker from "./ColorPicker";
import { Row, Column, Heading } from "../styled";

export const CardColorPicker = ({ title, picker, handler }) => (
  <Row style={{ margin: 35 }}>
    <Column style={{ marginBottom: 10 }}>
      <Heading size={16}>{title}</Heading>
    </Column>
    <Column style={{ marginBottom: 10 }}>
      <div
        style={{
          height: 30,
          width: 30,
          background: picker,
          borderRadius: "50%"
        }}
      />
    </Column>
    <Column>
      <ColorPicker color={picker} handler={handler} />
    </Column>
  </Row>
);

export default CardColorPicker;
