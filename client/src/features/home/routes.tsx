import React from "react";

import { HOME_PAGE_URL } from "./urls";
import HomePage from "./pages/HomePage";
import { PrivateRoute } from "shared";

export const homeRoutes = [
    <PrivateRoute key="home-page" path={HOME_PAGE_URL.urlTemplate} component={HomePage} exact />,
];