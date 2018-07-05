import React from "react";
import { Row, Column } from "../styled";
import { printFunction } from "../helpers";

const Message = () => (
  <Row
    style={{
      marginTop: 20,
      marginBottom: 20,
      borderRadius: 10,
      paddingBottom: 10
    }}
  >
    <Column
      style={{
        color: "white",
        background: "palevioletred",
        borderRadius: 10
      }}
    >
      Your function will be printed here.
    </Column>
  </Row>
);

export const PrintFn = ({ fn }) =>
  fn ? (
    <Row
      style={{
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 10,
        paddingBottom: 10
      }}
    >
      <Column
        style={{
          color: "white",
          background: "palevioletred",
          borderRadius: 10
        }}
      >
        Your function is:
      </Column>
      <Column
        style={{
          marginTop: 10,
          borderRadius: 10,
          paddingTop: 10,
          paddingBottom: 10,
          border: "1px solid palevioletred"
        }}
      >
        <div style={{ width: 300, overflowWrap: "break-word" }}>
          <code>{printFunction(fn)}</code>
        </div>
      </Column>
    </Row>
  ) : (
    <Message />
  );

export default PrintFn;
