import { AppState } from "app-state";

const selectState  = (state: AppState) => state.home;

export const selectHomeStatus = (state: AppState) => selectState(state).status;

export const selectUserData = (state: AppState) => selectState(state).user;

// dialogs
export const selectDialogsState = (state: AppState) => selectState(state).dialogs;

export const selectActiveDialog = (state: AppState) => selectState(state).dialogs.selectedDialog;


// messages
export const selectMessagesState = (state: AppState) => selectState(state).messages;

export const selectTextMessageText = (state: AppState) => selectState(state).messages.textMessage;

// websocket
export const selecteWebSocket = (state: AppState) => selectState(state).webSocket.socket;
