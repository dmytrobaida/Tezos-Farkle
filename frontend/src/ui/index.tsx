import { createGlobalStyle } from "styled-components";

import RootStore, { RootStoreContext } from "store";

import { MainPage } from "./pages";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }
`;

const rootStore = new RootStore();

export default () => {
  return (
    <>
      <GlobalStyle />
      <RootStoreContext.Provider value={rootStore}>
        <MainPage />
      </RootStoreContext.Provider>
    </>
  );
};
