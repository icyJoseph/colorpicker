import React from "react";
import ColorPicker from "./ColorPicker";
import TestColorPicker from "./TestColorPicker";
import { Row, Column, Title } from "../styled";

export const CardColorPicker = ({
  title,
  textColor,
  picker,
  handler,
  testMode
}) => (
  <Column style={{ height: "120px" }}>
    <Row direction="column">
      <Column>
        <Title color={textColor} size={16}>
          {testMode ? " " : title}
        </Title>
      </Column>
      <Column>
        {testMode ? (
          <TestColorPicker color={picker} handler={handler} />
        ) : (
          <ColorPicker color={picker} handler={handler} />
        )}
      </Column>
    </Row>
  </Column>
);

export default CardColorPicker;
