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
  color: white;
`;

export const InfoLine = styled.div`
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;

  :hover {
    color: red;
  }
`;

export const ConnectWalletMenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 12vh;
`;
