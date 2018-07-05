import React from "react";
import Spinner from "react-spinkit";
import { Row, Column } from "../styled";

export const Loader = () => (
  <Row>
    <Column style={{ height: "150px" }}>
      <Spinner name="three-bounce" size={60} />
    </Column>
  </Row>
);

export default Loader;
