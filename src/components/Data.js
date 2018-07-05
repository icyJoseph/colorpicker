import React from "react";
import { rgbaToString } from "../helpers";

export const Data = ({ data }) =>
  data.map(({ input, output }, index) => (
    <div
      key={`${index}-${input.temp}`}
      style={{
        display: "flex",
        justifyContent: "center",
        margin: 10
      }}
    >
      <code>
        Data[{index}]: {`${"{"}`} temperature:{input.temp}, color:{" "}
      </code>
      <div
        style={{
          borderRadius: "50%",
          height: 16,
          width: 16,
          background: rgbaToString(output)
        }}
      />
      <code>{`${"}"}`}</code>
    </div>
  ));

export default Data;
