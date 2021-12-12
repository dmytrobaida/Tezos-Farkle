import styled from "styled-components";

export const PageContainer = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100vw;
  height: 12vh;
  background-color: red;
  padding-left: 50px;
  padding-right: 50px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 88vh;
  background-color: blue;
`;

export const AllGamesTable = styled.table`
  border-collapse: collapse;

  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
`;
