import React from "react";
import ColorPicker from "./ColorPicker";
import { Row, Column, Title } from "../styled";

export const CardColorPicker = ({ title, textColor, picker, handler }) => (
  <Column style={{ height: "120px" }}>
    <Row direction="column">
      <Column>
        <Title color={textColor} size={16}>
          {title}
        </Title>
      </Column>
      <Column>
        <ColorPicker color={picker} handler={handler} />
      </Column>
    </Row>
  </Column>
);

export default CardColorPicker;
