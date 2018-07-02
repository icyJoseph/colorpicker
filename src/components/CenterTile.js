import React from "react";
import { Row, Column, Text } from "../styled";

export const CardColorPicker = ({ title, textColor, count, base }) => (
  <Column>
    <Row>
      <Column>
        <Text color={textColor}>{title}</Text>
      </Column>
      <Column>
        <Text color={textColor}>
          {count}/{base}
        </Text>
      </Column>
    </Row>
  </Column>
);

export default CardColorPicker;
