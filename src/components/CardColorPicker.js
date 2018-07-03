import React from "react";
import ColorPicker from "./ColorPicker";
import { Row, Column, Heading } from "../styled";

export const CardColorPicker = ({ title, textColor, picker, handler }) => (
  <Column>
    <Row>
      <Column>
        <Heading color={textColor} size={16}>
          {title}
        </Heading>
      </Column>
      <Column>
        <ColorPicker color={picker} handler={handler} />
      </Column>
    </Row>
  </Column>
);

export default CardColorPicker;
