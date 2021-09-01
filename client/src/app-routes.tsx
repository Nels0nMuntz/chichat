import React from 'react';
import { Redirect, Route } from "react-router-dom";

import { NotFound } from 'shared';
import { authRotes } from 'features/auth';


const appRoutes = [
    ...authRotes,
    <Redirect
        key="main-home-page"
        from="/"
        to="/im"
        exact
    />,
    <Route key="not-found-page" component={NotFound} />,
];

export default appRoutes;