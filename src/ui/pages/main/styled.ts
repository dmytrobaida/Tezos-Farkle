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

  :hover {
    color: red;
  }
`;

export const ConnectWalletMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  top: 0;
  right: 0;
`;

export const DicesAnchor = styled.div``;
