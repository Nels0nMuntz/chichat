import React from 'react';
import { render } from 'react-dom';
import { Switch, BrowserRouter } from 'react-router-dom';

import appRoutes from './app-routes';

import 'assets/styles/index.css';


render(
    <BrowserRouter>
        <Switch>
            {appRoutes}
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);