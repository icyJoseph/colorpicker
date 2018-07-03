import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const Row = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Column = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Heading = styled.div`
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
  font-size: 20pt;
`;

export const Button = styled.button`
  font-size: 1em;
  width: 75px;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
