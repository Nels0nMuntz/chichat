import { AppState } from "app-state";


const selectState = (state: AppState) => state.messages;

export const selectMessagesState = (state: AppState) => selectState(state);

export const selectTextMessageText = (state: AppState) => selectState(state).textMessage;

export const selectSelectMode = (state: AppState) => selectState(state).selectMode;

export const selectSelectedMessages = (state: AppState) => selectState(state).selectedMessages;