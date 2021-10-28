import { AppState } from "app-state";


const selectState = (state: AppState) => state.messages;

export const selectMessagesStatus = (state: AppState) => selectState(state).status;

export const selectTextMessageText = (state: AppState) => selectState(state).textMessage;

export const selectSelectMode = (state: AppState) => selectState(state).selectMode;