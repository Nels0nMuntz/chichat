import { AppState } from "app-state";

const selectState  = (state: AppState) => state.home;

export const selectHomeStatus = (state: AppState) => selectState(state).status;

export const selectUser = (state: AppState) => selectState(state).user;

export const selectUserId = (state: AppState) => selectState(state).user.userId;

// websocket
export const selecteWebSocket = (state: AppState) => selectState(state).webSocket.socket;
