import { createGlobalStyle } from "styled-components";
import { Route, Routes } from "react-router-dom";

import RootStore, { RootStoreContext } from "store";

import { AppRoutes } from "./routes";

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
        <Routes>
          {AppRoutes.map((routeProps, i) => (
            <Route key={i} {...routeProps} />
          ))}
        </Routes>
      </RootStoreContext.Provider>
    </>
  );
};
