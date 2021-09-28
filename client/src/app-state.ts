import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'connected-react-router';
import { all } from '@redux-saga/core/effects';

import { homeReducer, dialogsWatcherSaga } from 'features/home/store';
import { notificationReducer } from 'features/notification/store';
import { authReducer, authWatcherSaga } from 'features/auth/store';
import { history } from './history-instance';


const rootReducer = combineReducers({
    router: connectRouter(history),
    home: homeReducer,
    notification: notificationReducer,
    auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware,
        ),
    ),      
);

function* appSaga(){
    yield all([
        authWatcherSaga(),
        dialogsWatcherSaga(),
    ]);
};

sagaMiddleware.run(appSaga);

/* @ts-ignore */
window.store = store;

export type AppState = ReturnType<typeof rootReducer>;