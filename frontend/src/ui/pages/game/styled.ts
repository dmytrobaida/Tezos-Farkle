import styled from "styled-components";

export const PageContainer = styled.div`
  position: relative;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: #cdcdcd;
`;

export const GameFrame = styled.div`
  position: relative;
  width: 80vw;
  height: 60vh;
  border: 5px solid #cdcdcd;
  background-color: grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ResultLine = styled.span`
  color: black;
  font-size: 40px;
  font-family: monospace;
`;

