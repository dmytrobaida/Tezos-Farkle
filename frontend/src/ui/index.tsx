import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Route, Routes } from "react-router-dom";
import { styleReset } from "react95";
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

import RootStore, { RootStoreContext } from "store";

import { AppRoutes } from "./routes";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
    margin: 0;
  }
  *::not(.md) {
    ${styleReset}
  }
`;

const rootStore = new RootStore();

export default () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={original}>
        <RootStoreContext.Provider value={rootStore}>
          <Routes>
            {AppRoutes.map((routeProps, i) => (
              <Route key={i} {...routeProps} />
            ))}
          </Routes>
        </RootStoreContext.Provider>
      </ThemeProvider>
    </>
  );
};
