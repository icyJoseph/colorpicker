import React, { Fragment } from "react";
import { Row, Title, Heading } from "../styled";

export const MainTitle = ({ title, subtitle }) => (
  <Fragment>
    <Row>
      <Title size={24}>{title}</Title>
    </Row>
    <Heading>
      <Heading>{subtitle}</Heading>
    </Heading>
  </Fragment>
);

export default MainTitle;
