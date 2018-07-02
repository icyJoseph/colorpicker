import React from "react";
import { Row, Column, Title } from "../styled";

export const MainTitle = ({ textColor, title }) => (
  <Row>
    <Column>
      <Title color={textColor} size={24}>
        {title}
      </Title>
    </Column>
  </Row>
);

export default MainTitle;
