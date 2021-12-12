import React from "react";
import { RouteProps } from "react-router-dom";

import { MainPage, GamePage, LandingPage } from "ui/pages";
import { AuthProtector } from "ui/components";

export const AppRoutes: RouteProps[] = [
  {
    path: "/",
    element: React.createElement(LandingPage),
  },
  {
    path: "/game",
    element: React.createElement(AuthProtector, {
      children: React.createElement(GamePage),
    }),
  },
  {
    path: "/main",
    element: React.createElement(AuthProtector, {
      children: React.createElement(MainPage),
    }),
  },
];
