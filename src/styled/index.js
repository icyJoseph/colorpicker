import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background: ${props => props.background};
`;
export const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: ${props => props.direction};
`;

export const Column = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.span`
  display: flex;
  flex: 1;
  min-height: 75px;
  height: 75px;
  height: auto !important;
  font-size: ${props => props.size}pt;
  justify-content: center;
  align-items: center;
  color: ${props => props.color};
`;

export const Text = styled.span`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  color: ${props => props.color};
  font-size: 20pt;
`;

export const Button = styled.button`
  background: ${props => (props.primary ? "palevioletred" : "white")};
  color: ${props => (props.primary ? "white" : "palevioletred")};
  font-size: 1em;
  width: 75px;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
