import styled from "styled-components";

export const Row = styled.div`
  margin-bottom: 10px;
  height: 100px;
  display: flex;
`;
export const CardContainer = styled.div`
  display: inline-block;
  width: 100px;
  height: 100px;
  background: orange;
  margin-right: 10px;
  transform: ${props => (props.active ? "scale(1.1)" : "scale(1)")};
  transition: transform 0.2s ease-in;
`;
