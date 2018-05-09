import React from "react";
import { Row, Column, Text } from "../styled";

export const CardColorPicker = ({ title, textColor, count, base, trained }) => (
  <Column>
    <Row direction="column">
      <Column>
        <Text color={textColor} style={{ marginTop: "10px" }}>
          {title}
        </Text>
      </Column>
      <Column>
        <Text color={textColor} style={{ marginTop: "10px" }}>
          {count}/{base}
        </Text>
      </Column>
    </Row>
  </Column>
);

export default CardColorPicker;
