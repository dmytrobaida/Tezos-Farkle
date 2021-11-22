import styled from "styled-components";

export const Container = styled.div`
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
  margin-bottom: 10px;
  cursor: pointer;
  
  :hover {
    color: red;
  }
`;
