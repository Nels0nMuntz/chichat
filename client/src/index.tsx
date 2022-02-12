import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'

import App from './App';
import { store } from './app-state';
import { ThemeProvider } from 'shared';
import { SnackbarProvider } from 'features/notification';
import { history } from './history-instance';

import 'assets/styles/index.scss';


render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <BrowserRouter>
                <ThemeProvider>
                    <SnackbarProvider>
                        <App />
                    </SnackbarProvider>
                </ThemeProvider>
            </BrowserRouter>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);