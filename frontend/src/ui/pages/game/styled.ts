import styled from "styled-components";
import { Window } from "react95";

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
  width: calc(80vw - 250px);
  height: 76vh;
  border: 5px solid #cdcdcd;
  background-color: grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ThrowsContainer = styled(Window)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const Player1ThrowsContainer = styled(ThrowsContainer)`
  left: 10px;
`;

export const Player2ThrowsContainer = styled(ThrowsContainer)`
  right: 10px;
`;

export const ResultLine = styled.span`
  color: black;
  font-size: 40px;
  font-family: monospace;
`;

export const ControlsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: space-between;
`;
