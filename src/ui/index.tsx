import { createGlobalStyle } from "styled-components";
import { ErrorBoundary } from "react-error-boundary";

import { MainPage } from "./pages";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default () => {
  return (
    <>
      <GlobalStyle />
      <ErrorBoundary fallbackRender={({ error }) => <div>{error}</div>}>
        <MainPage />
      </ErrorBoundary>
    </>
  );
};
