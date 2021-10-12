import { AppState } from "app-state";

const selectState  = (state: AppState) => state.home;

export const selectHomeStatus = (state: AppState) => selectState(state).status;

// dialogs

export const selectDialogsState = (state: AppState) => selectState(state).dialogs;

export const selectActiveDialog = (state: AppState) => selectState(state).dialogs.selectedDialog;


// messages

export const selectMessagesState = (state: AppState) => selectState(state).messages;

export const selectTextMessageText = (state: AppState) => selectState(state).messages.textMessage.text;