import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div.attrs({
  style: ({ style }) => ({ ...style })
})`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Column = styled.div.attrs({
  style: ({ style }) => ({ ...style })
})`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1.attrs({
  style: ({ color }) => ({ color })
})`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
`;

export const Heading = styled.div.attrs({
  style: ({ color }) => ({ color })
})`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.span`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14pt;
  font-weight: 400;
`;

export const RGBColor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Button = styled.button`
  font-size: 1em;
  width: 75px;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  background: palevioletred;
  color: white;
`;

export const ColorPad = styled.div.attrs({
  style: ({ background }) => ({ background })
})`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  justify-content: center;
  display: flex;
  align-items: center;
`;
