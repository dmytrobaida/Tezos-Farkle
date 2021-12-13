import styled from "styled-components";

import { BaseButton } from "ui/components";

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

const ThrowsContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: black;
  border: 5px solid #cdcdcd;
  width: 250px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Player1ThrowsContainer = styled(ThrowsContainer)`
  left: 10px;
`;

export const Player2ThrowsContainer = styled(ThrowsContainer)`
  right: 10px;
`;

export const InfoLineHeader = styled.div`
  font-family: monospace;
  font-size: 25px;
  background-color: rgba($color: #fff, $alpha: 0.2);
  padding-left: 10px;
  padding-right: 10px;
  color: #cdcdcd;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
`;

export const InfoLine = styled.div`
  font-family: monospace;
  font-size: 20px;
  background-color: rgba($color: #fff, $alpha: 0.2);
  padding-left: 10px;
  padding-right: 10px;
  color: #cdcdcd;
  box-sizing: border-box;
  width: 100%;
`;

export const ResultLine = styled.span`
  color: #cdcdcd;
  font-size: 40px;
  font-family: monospace;
  margin-top: 5px;
`;

export const ControlsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

export const ControlButton = styled(BaseButton)`
  margin-left: 10px;
  margin-right: 10px;
  text-transform: uppercase;
`;
