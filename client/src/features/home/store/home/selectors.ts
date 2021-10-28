import { AppState } from "app-state";

const selectState  = (state: AppState) => state.home;

export const selectHomeStatus = (state: AppState) => selectState(state).status;

export const selectUserData = (state: AppState) => selectState(state).user;

// websocket
export const selecteWebSocket = (state: AppState) => selectState(state).webSocket.socket;
