import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { HOME_PAGE_URL } from "./urls";

export const homeRoutes = [
    <Route key="home-page" path={HOME_PAGE_URL.urlTemplate} component={HomePage} exact />,
];