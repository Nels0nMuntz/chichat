import { combineReducers, createStore } from 'redux';

import { homeReducer } from 'features/home';


const rootReducer = combineReducers({
    home: homeReducer
});

export const store = createStore(
    rootReducer,
);

/* @ts-ignore */
window.store = store;

export type AppState = ReturnType<typeof rootReducer>;