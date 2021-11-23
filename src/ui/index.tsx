import { createGlobalStyle } from "styled-components";

import RootStore, { RootStoreContext } from "store";

import { MainPage } from "./pages";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
