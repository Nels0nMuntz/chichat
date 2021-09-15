import { combineReducers, createStore } from 'redux';

import { homeReducer } from 'features/home/store';
import { notificationReducer } from 'features/notification/store';
import { authReducer } from 'features/auth/store';


const rootReducer = combineReducers({
    home: homeReducer,
    notification: notificationReducer,
    auth: authReducer,
});

export const store = createStore(
    rootReducer,
);

/* @ts-ignore */
window.store = store;

export type AppState = ReturnType<typeof rootReducer>;